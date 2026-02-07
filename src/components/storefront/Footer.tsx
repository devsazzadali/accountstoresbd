import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-8">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* PlayerAuctions */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">PLAYERAUCTIONS</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-link">About Us</Link></li>
              <li><Link to="/" className="hover:text-link">Contact</Link></li>
              <li><Link to="/" className="hover:text-link">Affiliates</Link></li>
              <li><Link to="/" className="hover:text-link">Site Map</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-link">FAQ</Link></li>
              <li><Link to="/" className="hover:text-link">Ticket System</Link></li>
              <li><Link to="/" className="hover:text-link">Accessibility</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">LEGAL</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-link">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-link">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-link">Anti-Fraud</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">RESOURCES</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-link">Seller Guide</Link></li>
              <li><Link to="/" className="hover:text-link">Buyer Protection</Link></li>
              <li><Link to="/" className="hover:text-link">Blog</Link></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">PAYMENT METHODS</h4>
            <div className="flex flex-wrap gap-2">
              <PaymentIcon name="Visa" />
              <PaymentIcon name="MC" />
              <PaymentIcon name="PayPal" />
              <PaymentIcon name="Apple" />
              <PaymentIcon name="G Pay" />
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
              <SocialIcon name="Twitter" />
              <SocialIcon name="Discord" />
              <SocialIcon name="YouTube" />
              <SocialIcon name="Facebook" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PaymentIcon = ({ name }: { name: string }) => (
  <div className="px-2 py-1 bg-background border border-border rounded text-xs text-muted-foreground">
    {name}
  </div>
);

const SocialIcon = ({ name }: { name: string }) => (
  <button className="text-muted-foreground hover:text-link transition-colors text-sm">
    {name}
  </button>
);
