import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { EnquiryFormComponent } from '../../shared/components/enquiry-form/enquiry-form.component';
import { BUSINESS_INFO } from '../../core/config/business-info';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, EnquiryFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactPageComponent implements OnInit {
  businessInfo = BUSINESS_INFO;
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateSeo({
      title: 'Contact Us',
      description: 'Get in touch with Heshiv Mobility for tour package enquiries, custom pilgrimage itineraries, and instant WhatsApp support.'
    });
  }
}
