import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AccordionItem {
  title: string;
  content: string;
  expanded: boolean;
  category: string;
  originalIndex: number;
}

interface FilterConfig {
  sortBy: string;
  categories: {
    editing?: boolean;
    media?: boolean;
    management?: boolean;
    analytics?: boolean;
    layout?: boolean;
    visual?: boolean;
    typography?: boolean;
    colors?: boolean;
    basic?: boolean;
    intermediate?: boolean;
    expert?: boolean;
    developer?: boolean;
    [key: string]: boolean | undefined;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  // Using signals for better performance in Angular 20
  isDrawerOpen = signal(false);
  activeTab = signal('content');
  isDarkMode = signal(true); // Default to dark mode
  
  // Search terms
  contentSearchTerm = '';
  designSearchTerm = '';
  advancedSearchTerm = '';
  
  // Filter dropdown states
  filterDropdowns = {
    content: false,
    design: false,
    advanced: false
  };
  
  // Filter configurations
  filters = {
    content: {
      sortBy: 'default',
      categories: {
        editing: false,
        media: false,
        management: false,
        analytics: false
      }
    } as FilterConfig,
    design: {
      sortBy: 'default',
      categories: {
        layout: false,
        visual: false,
        typography: false,
        colors: false
      }
    } as FilterConfig,
    advanced: {
      sortBy: 'default',
      categories: {
        basic: false,
        intermediate: false,
        expert: false,
        developer: false
      }
    } as FilterConfig
  };
  
  // Original items
  contentItems: AccordionItem[] = [];
  designItems: AccordionItem[] = [];
  advancedItems: AccordionItem[] = [];
  
  // Filtered items
  filteredContentItems: AccordionItem[] = [];
  filteredDesignItems: AccordionItem[] = [];
  filteredAdvancedItems: AccordionItem[] = [];

  // Icon arrays for different sections
  contentIcons = ['edit', 'image', 'layer-group', 'cubes', 'link', 'tags', 'calendar', 'check-circle', 'globe', 'chart-bar'];
  designIcons = ['expand-arrows-alt', 'arrows-alt', 'border-style', 'shadow', 'palette', 'font', 'th', 'play', 'fill', 'magic'];
  advancedIcons = ['transform', 'code', 'plug', 'server', 'tachometer-alt', 'shield-alt', 'database', 'exclamation-triangle', 'tools', 'cog'];

  ngOnInit() {
    this.initializeContentItems();
    this.initializeDesignItems();
    this.initializeAdvancedItems();
    
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    }
    
    // Close filter dropdowns when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown-wrapper')) {
        this.filterDropdowns = {
          content: false,
          design: false,
          advanced: false
        };
      }
    });
  }

  initializeContentItems() {
    this.contentItems = [
      {
        title: 'Text Editor',
        content: 'Advanced text editing capabilities with rich formatting options, spell check, and collaborative editing features for professional content creation.',
        expanded: false,
        category: 'editing',
        originalIndex: 0
      },
      {
        title: 'Media Gallery',
        content: 'Comprehensive media management system with image optimization, video streaming, and gallery organization tools for multimedia content.',
        expanded: false,
        category: 'media',
        originalIndex: 1
      },
      {
        title: 'Layout Builder',
        content: 'Drag-and-drop layout constructor with responsive grid system and component-based architecture for flexible page designs.',
        expanded: false,
        category: 'management',
        originalIndex: 2
      },
      {
        title: 'Content Blocks',
        content: 'Modular content system with reusable blocks, custom templates, and dynamic content rendering for efficient content management.',
        expanded: false,
        category: 'management',
        originalIndex: 3
      },
      {
        title: 'Data Integration',
        content: 'Real-time data synchronization with external APIs, webhooks, and automated content updates for seamless workflow integration.',
        expanded: false,
        category: 'management',
        originalIndex: 4
      },
      {
        title: 'Tag Manager',
        content: 'Smart tagging system with auto-suggestions, hierarchical categories, and advanced filtering for better content organization.',
        expanded: false,
        category: 'management',
        originalIndex: 5
      },
      {
        title: 'Scheduler',
        content: 'Content scheduling with timezone support, recurring publications, and automated workflows for timely content delivery.',
        expanded: false,
        category: 'management',
        originalIndex: 6
      },
      {
        title: 'Quality Control',
        content: 'Automated content validation, approval workflows, and compliance checking systems for maintaining content standards.',
        expanded: false,
        category: 'management',
        originalIndex: 7
      },
      {
        title: 'Localization Hub',
        content: 'Multi-language support with translation management, regional customization, and RTL layouts for global content distribution.',
        expanded: false,
        category: 'editing',
        originalIndex: 8
      },
      {
        title: 'Analytics Dashboard',
        content: 'Comprehensive analytics with user engagement tracking, performance metrics, and custom reports for data-driven decisions.',
        expanded: false,
        category: 'analytics',
        originalIndex: 9
      }
    ];
    this.filteredContentItems = [...this.contentItems];
  }

  initializeDesignItems() {
    this.designItems = [
      {
        title: 'Responsive Sizing',
        content: 'Fluid sizing system with breakpoint controls, aspect ratio management, and viewport optimization for perfect responsive design.',
        expanded: false,
        category: 'layout',
        originalIndex: 0
      },
      {
        title: 'Smart Spacing',
        content: 'Intelligent spacing system with consistent margins, padding scales, and rhythm-based typography for harmonious layouts.',
        expanded: false,
        category: 'layout',
        originalIndex: 1
      },
      {
        title: 'Border Studio',
        content: 'Advanced border customization with gradient borders, animated outlines, and custom shapes for unique visual elements.',
        expanded: false,
        category: 'visual',
        originalIndex: 2
      },
      {
        title: 'Shadow Effects',
        content: 'Professional shadow system with multiple layers, color customization, and lighting effects for depth and dimension.',
        expanded: false,
        category: 'visual',
        originalIndex: 3
      },
      {
        title: 'Color Harmonies',
        content: 'Intelligent color palette generator with accessibility compliance and brand consistency tools for perfect color schemes.',
        expanded: false,
        category: 'colors',
        originalIndex: 4
      },
      {
        title: 'Typography Scale',
        content: 'Modular typography system with web font loading, variable fonts, and reading optimization for excellent readability.',
        expanded: false,
        category: 'typography',
        originalIndex: 5
      },
      {
        title: 'Grid Systems',
        content: 'Advanced CSS Grid and Flexbox layouts with visual grid editor and responsive templates for complex layouts.',
        expanded: false,
        category: 'layout',
        originalIndex: 6
      },
      {
        title: 'Motion Design',
        content: 'Sophisticated animation system with easing functions, timeline control, and performance optimization for smooth interactions.',
        expanded: false,
        category: 'visual',
        originalIndex: 7
      },
      {
        title: 'Background Art',
        content: 'Creative background system with gradients, patterns, textures, and interactive elements for stunning visual appeal.',
        expanded: false,
        category: 'colors',
        originalIndex: 8
      },
      {
        title: 'Visual Filters',
        content: 'Professional filter effects with blur, contrast, saturation controls, and Instagram-style presets for image enhancement.',
        expanded: false,
        category: 'visual',
        originalIndex: 9
      }
    ];
    this.filteredDesignItems = [...this.designItems];
  }

  initializeAdvancedItems() {
    this.advancedItems = [
      {
        title: 'Transform Engine',
        content: '3D transforms with matrix operations, perspective controls, and hardware acceleration optimization for advanced visual effects.',
        expanded: false,
        category: 'expert',
        originalIndex: 0
      },
      {
        title: 'CSS Processor',
        content: 'Advanced CSS preprocessing with SASS/LESS support, autoprefixer, and minification tools for optimized stylesheets.',
        expanded: false,
        category: 'intermediate',
        originalIndex: 1
      },
      {
        title: 'Plugin Architecture',
        content: 'Extensible plugin system with custom hooks, event handlers, and third-party integrations for unlimited functionality.',
        expanded: false,
        category: 'developer',
        originalIndex: 2
      },
      {
        title: 'API Gateway',
        content: 'Centralized API management with rate limiting, authentication, caching, and monitoring for robust backend integration.',
        expanded: false,
        category: 'expert',
        originalIndex: 3
      },
      {
        title: 'Performance Suite',
        content: 'Complete performance optimization with lazy loading, code splitting, and resource prefetching for lightning-fast loading.',
        expanded: false,
        category: 'intermediate',
        originalIndex: 4
      },
      {
        title: 'Security Center',
        content: 'Enterprise-grade security with encryption, access controls, audit logs, and compliance tools for maximum protection.',
        expanded: false,
        category: 'expert',
        originalIndex: 5
      },
      {
        title: 'Database Hub',
        content: 'Multi-database support with connection pooling, query optimization, and data migration tools for scalable data management.',
        expanded: false,
        category: 'expert',
        originalIndex: 6
      },
      {
        title: 'Error Tracking',
        content: 'Real-time error monitoring with stack trace analysis, user context, and automated notifications for quick issue resolution.',
        expanded: false,
        category: 'basic',
        originalIndex: 7
      },
      {
        title: 'Developer Tools',
        content: 'Comprehensive development suite with debugging, profiling, testing, and deployment utilities for efficient development.',
        expanded: false,
        category: 'developer',
        originalIndex: 8
      },
      {
        title: 'Cloud Config',
        content: 'Cloud infrastructure management with auto-scaling, load balancing, and environment provisioning for enterprise deployment.',
        expanded: false,
        category: 'expert',
        originalIndex: 9
      }
    ];
    this.filteredAdvancedItems = [...this.advancedItems];
  }

  toggleDrawer() {
    this.isDrawerOpen.set(!this.isDrawerOpen());
    // Close all filter dropdowns when drawer opens/closes
    this.filterDropdowns = {
      content: false,
      design: false,
      advanced: false
    };
  }

  closeDrawer() {
    this.isDrawerOpen.set(false);
    // Close all filter dropdowns when drawer closes
    this.filterDropdowns = {
      content: false,
      design: false,
      advanced: false
    };
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
    // Close all filter dropdowns when switching tabs
    this.filterDropdowns = {
      content: false,
      design: false,
      advanced: false
    };
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }

  toggleFilterDropdown(section: string) {
    this.filterDropdowns = {
      content: false,
      design: false,
      advanced: false,
      [section]: !this.filterDropdowns[section as keyof typeof this.filterDropdowns]
    };
  }

  clearFilters(section: string) {
    const sectionKey = section as keyof typeof this.filters;
    this.filters[sectionKey].sortBy = 'default';
    
    // Clear all category filters
    Object.keys(this.filters[sectionKey].categories).forEach(key => {
      if (this.filters[sectionKey].categories[key] !== undefined) {
        this.filters[sectionKey].categories[key] = false;
      }
    });
    
    this.applyFilters(section);
  }

  applyFilters(section: string) {
    switch(section) {
      case 'content':
        this.applyContentFilters();
        break;
      case 'design':
        this.applyDesignFilters();
        break;
      case 'advanced':
        this.applyAdvancedFilters();
        break;
    }
  }

  applyContentFilters() {
    let items = [...this.contentItems];
    
    // Apply category filters
    const selectedCategories = Object.keys(this.filters.content.categories)
      .filter(key => this.filters.content.categories[key] === true);
    
    if (selectedCategories.length > 0) {
      items = items.filter(item => selectedCategories.includes(item.category));
    }
    
    // Apply search filter
    if (this.contentSearchTerm.trim() !== '') {
      items = items.filter(item =>
        item.title.toLowerCase().includes(this.contentSearchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(this.contentSearchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    items = this.applySorting(items, this.filters.content.sortBy);
    
    this.filteredContentItems = items;
  }

  applyDesignFilters() {
    let items = [...this.designItems];
    
    // Apply category filters
    const selectedCategories = Object.keys(this.filters.design.categories)
      .filter(key => this.filters.design.categories[key] === true);
    
    if (selectedCategories.length > 0) {
      items = items.filter(item => selectedCategories.includes(item.category));
    }
    
    // Apply search filter
    if (this.designSearchTerm.trim() !== '') {
      items = items.filter(item =>
        item.title.toLowerCase().includes(this.designSearchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(this.designSearchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    items = this.applySorting(items, this.filters.design.sortBy);
    
    this.filteredDesignItems = items;
  }

  applyAdvancedFilters() {
    let items = [...this.advancedItems];
    
    // Apply category filters
    const selectedCategories = Object.keys(this.filters.advanced.categories)
      .filter(key => this.filters.advanced.categories[key] === true);
    
    if (selectedCategories.length > 0) {
      items = items.filter(item => selectedCategories.includes(item.category));
    }
    
    // Apply search filter
    if (this.advancedSearchTerm.trim() !== '') {
      items = items.filter(item =>
        item.title.toLowerCase().includes(this.advancedSearchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(this.advancedSearchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    items = this.applySorting(items, this.filters.advanced.sortBy);
    
    this.filteredAdvancedItems = items;
  }

  applySorting(items: AccordionItem[], sortBy: string): AccordionItem[] {
    switch(sortBy) {
      case 'alphabetical':
        return items.sort((a, b) => a.title.localeCompare(b.title));
      case 'reverse-alphabetical':
        return items.sort((a, b) => b.title.localeCompare(a.title));
      case 'default':
      default:
        return items.sort((a, b) => a.originalIndex - b.originalIndex);
    }
  }

  filterAccordions(section: string) {
    this.applyFilters(section);
  }

  toggleAccordion(section: string, index: number) {
    switch(section) {
      case 'content':
        this.filteredContentItems[index].expanded = !this.filteredContentItems[index].expanded;
        break;
      case 'design':
        this.filteredDesignItems[index].expanded = !this.filteredDesignItems[index].expanded;
        break;
      case 'advanced':
        this.filteredAdvancedItems[index].expanded = !this.filteredAdvancedItems[index].expanded;
        break;
    }
  }

  // Icon getter methods
  getContentIcon(index: number): string {
    const item = this.filteredContentItems[index];
    return item ? this.contentIcons[item.originalIndex] || 'circle' : 'circle';
  }

  getDesignIcon(index: number): string {
    const item = this.filteredDesignItems[index];
    return item ? this.designIcons[item.originalIndex] || 'circle' : 'circle';
  }

  getAdvancedIcon(index: number): string {
    const item = this.filteredAdvancedItems[index];
    return item ? this.advancedIcons[item.originalIndex] || 'circle' : 'circle';
  }
}
