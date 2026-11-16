# WhatsApp contact landing page

Open `/contact/` on GitHub Pages (or local http server). This is an independent page; the existing Docsify blog is unchanged.

Edit `config.js`:
- `whatsappUrl`: your own full HTTPS WhatsApp click-to-chat link. It is deliberately blank until supplied.
- `backgroundImage`: currently the reference site's external preview image. Replace with your own image (e.g. `./background.jpg`) before launch. A gradient remains if no image is configured.
- `title`: browser title.
- `message`: optional prefilled chat message; nothing is sent automatically.

For TikTok bio use `https://YOUR-DOMAIN/contact/`. A normal HTTPS anchor preserves native long-press preview on iOS. The iOS preview, WhatsApp profile picture/name, and Open App menu are controlled by the OS, TikTok and WhatsApp; the page does not draw or impersonate these interfaces and cannot force them to appear. Android in-app browsers get menu instructions. Ordinary taps navigate normally when configured.

Phone verification: open inside TikTok on iPhone, long-press the card and use the offered WhatsApp/open-link action; repeat in Safari, Android TikTok, and with WhatsApp uninstalled. Desktop preview cannot verify native mobile behavior. Do not publish with a blank destination.

## Device routing

iOS preserves the native hold link. Android TikTok / in-app WebViews show the three-step guide and arrow; external Android browsers and desktop redirect with location.replace to the configured WhatsApp URL. UA detection is best effort; validate on real phones. Preview only: ?preview=android or ?preview=ios. Do not share preview URLs as production bio links.
