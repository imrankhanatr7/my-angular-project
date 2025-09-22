import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AccordionItem {
  id: number;
  title: string;
  description: string;
  expanded: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  isDrawerOpen = signal(false);
  activeTab = signal('design');
  searchTerm = '';
  showFilterDropdown = false;
  showPresetDropdown = false;
  showMoreMenu = false;

  // Filter settings
  filterSettings = {
    sortBy: 'default'
  };

  // Transform functionality
  selectedTransform = 'expand'; // Default active is expand
  verticalSliderPosition = 50;
  horizontalSliderPosition = 50;
  selectedDot = 5; // Center dot selected by default

  // Content items
  contentItems: AccordionItem[] = [
    { id: 1, title: 'Text Content', description: 'Manage all text content including headings, paragraphs, and inline text formatting options.', expanded: false },
    { id: 2, title: 'Rich Text Editor', description: 'Advanced WYSIWYG editor with formatting tools and collaborative editing features.', expanded: false },
    { id: 3, title: 'Image Management', description: 'Upload, resize, crop, and optimize images with automatic compression.', expanded: false },
    { id: 4, title: 'Video Integration', description: 'Embed videos from YouTube, Vimeo, or upload custom videos with playback controls.', expanded: false },
    { id: 5, title: 'Interactive Buttons', description: 'Create custom buttons with hover effects, animations, and click actions.', expanded: false },
    { id: 6, title: 'Form Builder', description: 'Build complex forms with validation rules and submission handling.', expanded: false },
    { id: 7, title: 'Data Tables', description: 'Create organized data tables with sorting and pagination features.', expanded: false },
    { id: 8, title: 'Icon Library', description: 'Access thousands of icons with customizable sizes and colors.', expanded: false },
    { id: 9, title: 'Media Gallery', description: 'Create stunning galleries with lightbox effects and navigation.', expanded: false },
    { id: 10, title: 'Content Templates', description: 'Design reusable content templates for consistent formatting.', expanded: false }
  ];

  // Design items
  designItems: AccordionItem[] = [
    { id: 1, title: 'Sizing', description: 'Control width, height, and responsive sizing with breakpoint-specific values.', expanded: false },
    { id: 2, title: 'Spacing', description: 'Manage margins, padding, and gaps with consistent spacing scales.', expanded: false },
    { id: 3, title: 'Border', description: 'Create custom borders with advanced styling and radius controls.', expanded: false },
    { id: 4, title: 'Box Shadow', description: 'Apply sophisticated shadow effects with multiple layers and presets.', expanded: false },
    { id: 5, title: 'Filters', description: 'Apply visual filters including blur, brightness, and color adjustments.', expanded: false },
    { id: 6, title: 'Transform', description: 'Apply 2D and 3D transformations with precise positioning control.', expanded: false },
    { id: 7, title: 'Background', description: 'Design complex backgrounds with gradients, patterns, and images.', expanded: false },
    { id: 8, title: 'Typography', description: 'Complete typography control with responsive font scaling.', expanded: false },
    { id: 9, title: 'Colors', description: 'Advanced color management with themes and accessibility compliance.', expanded: false },
    { id: 10, title: 'Layout Grid', description: 'Powerful CSS Grid and Flexbox layout tools with visual editor.', expanded: false }
  ];

  // Advanced items
  advancedItems: AccordionItem[] = [
    { id: 1, title: 'Custom CSS', description: 'Write custom CSS with syntax highlighting and real-time preview.', expanded: false },
    { id: 2, title: 'Animation', description: 'Create complex animations with keyframe editor and timing controls.', expanded: false },
    { id: 3, title: 'Responsive Design', description: 'Advanced responsive design tools with custom breakpoints.', expanded: false },
    { id: 4, title: 'JavaScript', description: 'Embed custom JavaScript for interactive behaviors.', expanded: false },
    { id: 5, title: 'Performance', description: 'Monitor and optimize performance with advanced metrics.', expanded: false },
    { id: 6, title: 'SEO Settings', description: 'Complete SEO setup with meta tags and structured data.', expanded: false },
    { id: 7, title: 'Accessibility', description: 'Ensure WCAG compliance with accessibility auditing tools.', expanded: false },
    { id: 8, title: 'API Integration', description: 'Connect to external APIs with authentication and error handling.', expanded: false },
    { id: 9, title: 'Security', description: 'Configure security headers and data protection measures.', expanded: false },
    { id: 10, title: 'Analytics', description: 'Integrate analytics tracking with privacy-compliant setup.', expanded: false }
  ];

  // Current filtered items
  currentContentItems: AccordionItem[] = [];
  currentDesignItems: AccordionItem[] = [];
  currentAdvancedItems: AccordionItem[] = [];

  ngOnInit() {
    this.initializeItems();
    this.setupEventListeners();
    setTimeout(() => this.isDrawerOpen.set(true), 500);
  }

  initializeItems() {
    this.currentContentItems = [...this.contentItems];
    this.currentDesignItems = [...this.designItems];
    this.currentAdvancedItems = [...this.advancedItems];
  }

  setupEventListeners() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown') && !target.closest('.filter-btn')) {
        this.showFilterDropdown = false;
      }
      if (!target.closest('.more-menu') && !target.closest('.more-btn')) {
        this.showMoreMenu = false;
      }
    });
  }

  toggleDrawer() {
    this.isDrawerOpen.set(!this.isDrawerOpen());
  }

  closeDrawer() {
    this.isDrawerOpen.set(false);
    this.showFilterDropdown = false;
    this.showMoreMenu = false;
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
    this.showFilterDropdown = false;
  }

  onSearch() {
    this.applyFilters();
  }

  toggleFilterDropdown(event: Event) {
    event.stopPropagation();
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  applyFilters() {
    this.currentContentItems = this.filterItems(this.contentItems);
    this.currentDesignItems = this.filterItems(this.designItems);
    this.currentAdvancedItems = this.filterItems(this.advancedItems);
  }

  filterItems(items: AccordionItem[]): AccordionItem[] {
    let filtered = [...items];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    switch (this.filterSettings.sortBy) {
      case 'alphabetical-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alphabetical-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'default':
      default:
        filtered.sort((a, b) => a.id - b.id);
        break;
    }

    return filtered;
  }

  clearAllFilters() {
    this.filterSettings.sortBy = 'default';
    this.searchTerm = '';
    this.applyFilters();
  }

  getFilteredItemsCount(): number {
    return this.getFilteredItems(this.getCurrentItems()).length;
  }

  getCurrentItems(): AccordionItem[] {
    switch(this.activeTab()) {
      case 'content': return this.currentContentItems;
      case 'design': return this.currentDesignItems;
      case 'advanced': return this.currentAdvancedItems;
      default: return [];
    }
  }

  getFilteredItems(items: AccordionItem[]): AccordionItem[] {
    return items;
  }

  toggleAccordion(section: string, id: number) {
    let items: AccordionItem[] = [];
    
    switch(section) {
      case 'content': items = this.currentContentItems; break;
      case 'design': items = this.currentDesignItems; break;
      case 'advanced': items = this.currentAdvancedItems; break;
    }
    
    const item = items.find(item => item.id === id);
    if (item) {
      item.expanded = !item.expanded;
    }
  }

  // Header actions
  togglePresetDropdown() {
    this.showPresetDropdown = !this.showPresetDropdown;
  }

  toggleMoreMenu() {
    this.showMoreMenu = !this.showMoreMenu;
  }

  openSettings() {
    console.log('Settings opened');
  }

  toggleView() {
    console.log('View toggled');
  }

  exportSettings() {
    console.log('Settings exported');
    this.showMoreMenu = false;
  }

  importSettings() {
    console.log('Settings imported');
    this.showMoreMenu = false;
  }

  resetSettings() {
    this.clearAllFilters();
    this.showMoreMenu = false;
  }

  // Transform functionality
  selectTransform(type: string) {
    this.selectedTransform = type;
  }

  selectDot(dotId: number) {
    this.selectedDot = dotId;
    console.log('Dot selected:', dotId);
  }

  moveVerticalSlider(event: MouseEvent) {
    const slider = event.currentTarget as HTMLElement;
    const rect = slider.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
    
    this.verticalSliderPosition = percentage;
  }

  moveHorizontalSlider(event: MouseEvent) {
    const slider = event.currentTarget as HTMLElement;
    const rect = slider.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    this.horizontalSliderPosition = percentage;
  }

  // Add these methods to your app.ts file
centerVerticalSlider() {
  this.verticalSliderPosition = 50;
  console.log('Vertical slider centered');
}

centerHorizontalSlider() {
  this.horizontalSliderPosition = 50;
  console.log('Horizontal slider centered');
}

}
