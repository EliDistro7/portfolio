

const ShareButton = ({ platform, url, text }) => {
    let shareUrl = "#";
    let icon;
  
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        icon = (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.273 8.273 0 01-2.357.637 4.077 4.077 0 001.804-2.223 8.19 8.19 0 01-2.605.975A4.106 4.106 0 0015.448 4c-2.266 0-4.104 1.82-4.104 4.065 0 .318.036.628.105.925C7.728 8.84 4.1 6.887 1.67 3.905a4.01 4.01 0 00-.555 2.044c0 1.41.726 2.655 1.83 3.384a4.105 4.105 0 01-1.86-.508v.05c0 1.97 1.42 3.616 3.301 3.987a4.11 4.11 0 01-1.853.07 4.108 4.108 0 003.834 2.835A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        icon = (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93h-2.4v-2.87H10v-2.2c0-2.37 1.4-3.68 3.54-3.68 1.02 0 2.1.18 2.1.18v2.3h-1.18c-1.17 0-1.53.72-1.53 1.46v1.94h2.61l-.42 2.87h-2.19v6.93c4.56-.93 8-4.96 8-9.8z" />
          </svg>
        );
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} - ${url}`)}`;
        icon = (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
            <path d="M19.11 17.8c-.24-.12-1.41-.69-1.63-.77-.22-.08-.39-.12-.56.12-.16.24-.63.77-.77.93-.14.16-.28.18-.52.06a6.97 6.97 0 01-2.05-1.26 7.71 7.71 0 01-1.42-1.79c-.14-.24 0-.36.1-.48.1-.1.24-.28.34-.42.1-.14.14-.24.22-.4.06-.14.02-.28-.02-.4-.08-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42H9.3c-.16 0-.4.06-.6.28-.2.24-.79.77-.79 1.89s.81 2.2.92 2.36c.1.16 1.58 2.46 3.84 3.45 2.26.97 2.26.65 2.66.6.4-.04 1.32-.54 1.5-1.06.18-.52.18-.96.14-1.06-.04-.08-.18-.12-.42-.24zM16.01 4C9.93 4 5 8.93 5 15c0 2.55.99 4.89 2.63 6.69L5 27l5.44-2.55a11.9 11.9 0 005.57 1.37c6.08 0 11.01-4.93 11.01-11.01 0-6.08-4.93-11.01-11.01-11.01z" />
          </svg>
        );
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        icon = (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452H17.2v-5.568c0-1.327-.026-3.037-1.849-3.037-1.849 0-2.133 1.445-2.133 2.94v5.665h-3.247V9h3.118v1.561h.044c.434-.82 1.494-1.683 3.076-1.683 3.291 0 3.899 2.165 3.899 4.978v6.596zM5.337 7.433a1.873 1.873 0 11.002-3.746 1.873 1.873 0 01-.002 3.746zM3.878 20.452h2.918V9H3.878v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
          </svg>
        );
        break;
    }
  
    return (
      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-900 text-white transition-colors"
      >
        {icon}
      </a>
    );
  };
  

  export default ShareButton;