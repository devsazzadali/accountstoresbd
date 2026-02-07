import { Link } from "react-router-dom";
import { CreditCard, Apple } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-8">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* PlayerAuctions */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-xs uppercase tracking-wider">PLAYERAUCTIONS</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-link">About Us</Link></li>
              <li><Link to="/" className="hover:text-link">Contact</Link></li>
              <li><Link to="/" className="hover:text-link">Affiliates</Link></li>
              <li><Link to="/" className="hover:text-link">Site Map</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-xs uppercase tracking-wider">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-link">FAQ</Link></li>
              <li><Link to="/" className="hover:text-link">Ticket System</Link></li>
              <li><Link to="/" className="hover:text-link">Accessibility</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-xs uppercase tracking-wider">LEGAL</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-link">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-link">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-link">Anti-Fraud</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-xs uppercase tracking-wider">RESOURCES</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-link">Seller Guide</Link></li>
              <li><Link to="/" className="hover:text-link">Buyer Protection</Link></li>
              <li><Link to="/" className="hover:text-link">Blog</Link></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-xs uppercase tracking-wider">PAYMENT METHODS</h4>
            <div className="flex flex-wrap gap-2">
              <PaymentIcon>
                <CreditCard className="h-4 w-4" />
              </PaymentIcon>
              <PaymentIcon>
                <span className="text-xs font-bold">VISA</span>
              </PaymentIcon>
              <PaymentIcon>
                <span className="text-xs font-bold">MC</span>
              </PaymentIcon>
              <PaymentIcon>
                <Apple className="h-4 w-4" />
              </PaymentIcon>
              <PaymentIcon>
                <span className="text-xs font-bold">G</span>
              </PaymentIcon>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 PlayerAuctions. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon icon="𝕏" />
              <SocialIcon icon="📘" />
              <SocialIcon icon="▶" />
              <SocialIcon icon="💬" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PaymentIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-10 h-6 bg-background border border-border rounded flex items-center justify-center text-muted-foreground">
    {children}
  </div>
);

const SocialIcon = ({ icon }: { icon: string }) => (
  <button className="w-8 h-8 bg-background border border-border rounded flex items-center justify-center text-muted-foreground hover:text-link transition-colors">
    {icon}
  </button>
);
