import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BUSINESS_INFO } from '../../../core/config/business-info';

@Component({
  selector: 'app-floating-payment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Floating Payment QR Button -->
    <button
      (click)="openModal()"
      class="payment-float"
      type="button"
      aria-label="Open Payment QR Code Modal"
      title="Scan & Pay via UPI / Google Pay">
      <svg class="qr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3z" fill="currentColor"/>
        <path d="M15 15h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2zM17 17h2v2h-2z"/>
        <rect x="5" y="5" width="2" height="2" fill="#0B2A5B"/>
        <rect x="17" y="5" width="2" height="2" fill="#0B2A5B"/>
        <rect x="5" y="17" width="2" height="2" fill="#0B2A5B"/>
      </svg>
      <span class="float-badge">Pay</span>
    </button>

    <!-- Modal Backdrop & Card -->
    <div
      *ngIf="isOpen()"
      class="modal-backdrop"
      (click)="closeModal()"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="header-title-wrap">
            <span class="gpay-badge">GPay / UPI</span>
            <h2 id="payment-modal-title" class="modal-title">Scan & Pay — {{ businessInfo.companyName }}</h2>
          </div>
          <button
            type="button"
            class="close-btn"
            (click)="closeModal()"
            aria-label="Close modal">
            &times;
          </button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <p class="subtitle">
            Scan this QR code using Google Pay, PhonePe, Paytm, or any UPI app to make instant payments for your travel bookings.
          </p>

          <div class="qr-container">
            <img
              [src]="qrImageUrl()"
              alt="Heshiv Mobility Google Pay UPI QR Code"
              class="qr-image"
              loading="eager" />
          </div>

          <div class="business-details">
            <div class="detail-row">
              <span class="label">Payee Name:</span>
              <span class="value">{{ businessInfo.companyName }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Support Helpline:</span>
              <a [href]="'tel:' + businessInfo.phone" class="value-link">{{ businessInfo.phone }}</a>
            </div>
          </div>

          <div class="supported-apps">
            <span class="app-chip">Google Pay</span>
            <span class="app-chip">PhonePe</span>
            <span class="app-chip">Paytm</span>
            <span class="app-chip">BHIM UPI</span>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn-close-action" (click)="closeModal()">
            Done & Close
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-float {
      position: fixed;
      bottom: 94px;
      right: 24px;
      width: 58px;
      height: 58px;
      background: linear-gradient(135deg, #0B2A5B, #164A91);
      color: #D9A21B;
      border: 2px solid #D9A21B;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(11, 42, 91, 0.4);
      z-index: 1020;
      cursor: pointer;
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 12px 28px rgba(11, 42, 91, 0.6);
        background: linear-gradient(135deg, #164A91, #0B2A5B);
      }

      .qr-icon {
        width: 26px;
        height: 26px;
      }

      .float-badge {
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #FFFFFF;
        line-height: 1;
        margin-top: 1px;
        letter-spacing: 0.5px;
      }
    }

    /* Modal Backdrop */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(11, 42, 91, 0.65);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1050;
      padding: 16px;
      animation: fadeIn 0.25s ease-out forwards;
    }

    /* Modal Card */
    .modal-card {
      background: #FFFFFF;
      width: 100%;
      max-width: 440px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(11, 42, 91, 0.3);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      border: 1px solid rgba(217, 162, 27, 0.3);
    }

    .modal-header {
      background: linear-gradient(135deg, #0B2A5B, #164A91);
      color: #FFFFFF;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .gpay-badge {
        font-size: 0.7rem;
        font-weight: 700;
        color: #0B2A5B;
        background: #F2C14E;
        padding: 2px 8px;
        border-radius: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: inline-block;
        margin-bottom: 4px;
      }

      .modal-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: #FFFFFF;
        margin: 0;
      }

      .close-btn {
        background: rgba(255, 255, 255, 0.15);
        color: #FFFFFF;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        font-size: 1.5rem;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }

    .modal-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .subtitle {
        font-size: 0.875rem;
        color: #667085;
        line-height: 1.45;
        margin-bottom: 18px;
      }

      .qr-container {
        background: #FFFFFF;
        padding: 16px;
        border-radius: 16px;
        border: 2px solid #E2E8F0;
        box-shadow: 0 8px 20px rgba(11, 42, 91, 0.08);
        margin-bottom: 20px;
        max-width: 260px;
        width: 100%;

        .qr-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }
      }

      .business-details {
        width: 100%;
        background: #F7F9FC;
        padding: 12px 16px;
        border-radius: 12px;
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;

          .label {
            color: #667085;
            font-weight: 500;
          }

          .value {
            color: #0B2A5B;
            font-weight: 700;
          }

          .value-link {
            color: #164A91;
            font-weight: 700;
            text-decoration: none;

            &:hover {
              color: #D9A21B;
            }
          }
        }
      }

      .supported-apps {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;

        .app-chip {
          font-size: 0.75rem;
          font-weight: 600;
          color: #0B2A5B;
          background: #E2E8F0;
          padding: 4px 10px;
          border-radius: 20px;
        }
      }
    }

    .modal-footer {
      padding: 16px 24px 20px;
      border-top: 1px solid #E2E8F0;
      display: flex;
      justify-content: center;

      .btn-close-action {
        width: 100%;
        padding: 12px;
        background: #0B2A5B;
        color: #FFFFFF;
        border: none;
        border-radius: 25px;
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
          background: #164A91;
        }
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
      .modal-backdrop, .modal-card, .payment-float {
        animation: none !important;
        transition: none !important;
      }
    }
  `]
})
export class FloatingPaymentComponent {
  businessInfo = BUSINESS_INFO;
  isOpen = signal<boolean>(false);
  qrImageUrl = signal<string>('images/payment-qr.png');

  openModal() {
    // Append timestamp parameter to force browser to fetch the updated image file directly
    this.qrImageUrl.set(`images/payment-qr.png?v=${Date.now()}`);
    this.isOpen.set(true);
  }

  closeModal() {
    this.isOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isOpen()) {
      this.closeModal();
    }
  }
}
