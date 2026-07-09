import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  fullText: string = 'Le Grand Pyramids view';
  displayText: string = '';
  typingTimer: any;
  isMenuOpen = false;

  activeFragment: string = 'home';
  private routerSub!: Subscription;
  private observer: IntersectionObserver | null = null;
  private isBrowser: boolean;

  private isManualScrolling = false;
  private scrollTimeout: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // 1. Move typing animation inside the browser guard so it never blocks the Netlify server pipeline
    if (this.isBrowser) {
      this.startTyping();
      setTimeout(() => this.initScrollObserver(), 300);
    } else {
      // Server fallback: Show full text immediately for SEO crawlers and instant layout
      this.displayText = this.fullText;
    }

    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.isManualScrolling) {
          const tree = this.router.parseUrl(this.router.url);
          this.activeFragment = tree.fragment || 'home';
        }
      });
  }

  initScrollObserver() {
    const sectionIds = ['home', 'rooms', 'facalities', 'reviews', 'contact'];

    const options = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (this.isManualScrolling) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeFragment = entry.target.id;
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.observer?.observe(el);
    });
  }

  startTyping() {
    let i = 0;
    this.typingTimer = setInterval(() => {
      this.displayText += this.fullText.charAt(i);
      i++;
      if (i >= this.fullText.length) clearInterval(this.typingTimer);
    }, 100);
  }

  ngOnDestroy() {
    if (this.typingTimer) clearInterval(this.typingTimer);
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    if (this.routerSub) this.routerSub.unsubscribe();
    if (this.observer) this.observer.disconnect();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string) {
    this.isMenuOpen = false;
    this.activeFragment = sectionId;
    this.isManualScrolling = true;

    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);

    // 2. Protect browser DOM document querying
    if (this.isBrowser) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    this.scrollTimeout = setTimeout(() => {
      this.isManualScrolling = false;
    }, 800);
  }
}
