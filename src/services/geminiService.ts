import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.initializeFromStorage();
  }

  private initializeFromStorage() {
    // Only access localStorage in the browser
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedApiKey = localStorage.getItem('gemini_api_key');
      if (savedApiKey) {
        this.setApiKey(savedApiKey);
      }
    }
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.ai = new GoogleGenAI({
      apiKey: apiKey
    });
  }

  isConfigured(): boolean {
    return this.ai !== null;
  }

  getSystemPrompt(): string {
    return `You are StaticWriteAI, an expert static website generator. Help users create modern, responsive websites through conversation.

RESPONSE STYLE:
- Keep responses brief and conversational
- NO markdown formatting (no **, *, #, etc.)
- Use plain text only
- Ask simple questions to understand their needs
- Be helpful and direct

CODE GENERATION:
- Generate complete HTML files with embedded CSS and JavaScript
- Use modern, responsive design patterns
- Include proper meta tags and SEO optimization
- Use clean, semantic HTML structure
- Add Google Fonts and professional styling
- Ensure mobile-first responsive design
- Add subtle animations and hover effects

IMAGE HANDLING:
- ALWAYS use working image URLs, never broken placeholder paths
- Use placehold.co for reliable placeholders: https://placehold.co/[width]x[height]/[bg-color]/[text-color]?text=[custom-text]
- For coding/tech projects, use images of websites, mobile apps, code editors, dashboards
- Technology/coding photos: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop (code on screen)
- Website mockups: https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop (laptop with website)
- Mobile app screens: https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop (phone with app)
- UI/UX design: https://images.unsplash.com/photo-1558655146-364adea1fcc9?w=800&h=600&fit=crop (design workspace)
- Dashboard/analytics: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop (charts and graphs)
- For people photos: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face
- For business/office: https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop
- For food: https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop
- Always include proper alt text for accessibility
- Make images responsive with appropriate CSS
- Use appropriate aspect ratios and sizes

TECHNOLOGY ICONS:
- Use CDN icons for technologies: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/[technology].svg
- React: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg
- Next.js: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg
- JavaScript: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg
- TypeScript: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg
- Node.js: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg
- Python: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg
- HTML5: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg
- CSS3: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/css3.svg
- Include proper styling for icons (size, color, hover effects)

DESIGN APPROACH:
- Clean, minimal designs with good whitespace
- Professional color schemes and typography (NEVER use purple gradients)
- Modern UI patterns and layouts with perfect symmetry
- Focus on usability and accessibility
- Fast loading and optimized performance
- CRITICAL: Ensure high contrast ratios for text readability (minimum 4.5:1)
- Use dark text on light backgrounds, light text on dark backgrounds
- Perfect alignment and symmetrical layouts
- Responsive design that works on all devices
- Modern color palettes: blues, greens, grays, neutrals (avoid purple)
- Consistent spacing using 8px grid system
- Professional typography with proper font weights and sizes
- Subtle shadows and rounded corners for modern feel

COPYRIGHT AND LEGAL:
- ALWAYS use 2025 as the copyright year in footers
- Format copyright as "© 2025 [Company/Site Name]. All rights reserved."
- Include proper copyright notices in website footers
- Use current year (2025) for any date references

When users describe what they want, generate beautiful, modern static websites that match their requirements. Keep your explanations short and focus on delivering quality code.`;
  }

  async *generateStreamingResponse(
    message: string,
    conversationHistory: ChatMessage[] = []
  ): AsyncGenerator<string, void, unknown> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API is not configured. Please set your API key.');
    }

    try {
      // Build conversation context
      const systemPrompt = this.getSystemPrompt();
      
      // Create the full prompt with context
      const fullPrompt = systemPrompt + `

CONVERSATION HISTORY:
${conversationHistory.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n')}

CURRENT REQUEST:
User: ${message}

INSTRUCTIONS:
- CRITICAL: If generating a website, respond with ONLY a brief conversational message, then put ALL HTML code in a single code block
- For questions/chat only, provide brief helpful guidance in plain text
- NO markdown formatting except code blocks for websites
- When creating websites, keep the conversation part SHORT and put ALL HTML in ONE code block
- Make all websites modern, responsive, and SEO-optimized
- EXAMPLE for website generation:
  "I'll create that for you!"
  \`\`\`html
  [COMPLETE HTML CODE HERE]
  \`\`\`
- EXAMPLE for chat: "Sure! I can help you with that. What specific features do you need?"`;

      const response = await this.ai!.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: fullPrompt,
      });

      // Simulate streaming by yielding words individually
      const text = response.text || '';
      const words = text.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        yield words[i] + (i < words.length - 1 ? ' ' : '');
        
        // Adjust streaming speed for better visual effect
        await new Promise(resolve => setTimeout(resolve, 30));
      }
    } catch (error) {
      console.error('Error in streaming response:', error);
      throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateResponse(
    message: string,
    conversationHistory: ChatMessage[] = []
  ): Promise<string> {
    const chunks: string[] = [];
    
    for await (const chunk of this.generateStreamingResponse(message, conversationHistory)) {
      chunks.push(chunk);
    }
    
    return chunks[chunks.length - 1] || '';
  }

  // Extract partial HTML code during streaming (for real-time display)
  extractPartialHtmlCode(response: string): string | null {
    // Look for the start of a code block and extract everything after it
    const codeBlockStart = response.indexOf('```html');
    if (codeBlockStart !== -1) {
      // Extract content after ```html
      const afterMarker = response.substring(codeBlockStart + 7);
      
      // If there's a closing ```, only take content before it
      const endMarker = afterMarker.indexOf('```');
      if (endMarker !== -1) {
        return afterMarker.substring(0, endMarker).trim();
      } else {
        // Still streaming, return what we have so far
        return afterMarker.trim();
      }
    }
    
    // Look for code blocks without language specification
    const genericCodeStart = response.indexOf('```');
    if (genericCodeStart !== -1) {
      const afterMarker = response.substring(genericCodeStart + 3);
      
      // Check if this contains HTML content
      if (afterMarker.includes('<!DOCTYPE') || afterMarker.includes('<html')) {
        const endMarker = afterMarker.indexOf('```');
        if (endMarker !== -1) {
          return afterMarker.substring(0, endMarker).trim();
        } else {
          return afterMarker.trim();
        }
      }
    }
    
    // Look for HTML content without code blocks (fallback)
    if (response.includes('<!DOCTYPE html>') || response.includes('<html')) {
      const lines = response.split('\n');
      const htmlStart = lines.findIndex(line => 
        line.includes('<!DOCTYPE html>') || line.includes('<html')
      );
      
      if (htmlStart !== -1) {
        // For streaming, take everything from HTML start to current end
        const htmlEnd = lines.findIndex((line, index) => 
          index > htmlStart && line.includes('</html>')
        );
        
        if (htmlEnd !== -1) {
          // Complete HTML found
          return lines.slice(htmlStart, htmlEnd + 1).join('\n');
        } else {
          // Still streaming, return partial HTML
          return lines.slice(htmlStart).join('\n');
        }
      }
    }
    
    return null;
  }

  // Extract HTML code from AI response and fix images (for final processing)
  extractHtmlCode(response: string): string | null {
    let extractedCode: string | null = null;
    
    // Look for HTML code blocks
    const htmlMatches = response.match(/```html([\s\S]*?)```/i);
    if (htmlMatches && htmlMatches[1]) {
      extractedCode = htmlMatches[1].trim();
    }

    // Look for code blocks without language specification that contain HTML
    if (!extractedCode) {
      const codeMatches = response.match(/```([\s\S]*?)```/g);
      if (codeMatches) {
        for (const match of codeMatches) {
          const code = match.replace(/```/g, '').trim();
          if (code.includes('<!DOCTYPE html>') || code.includes('<html')) {
            extractedCode = code;
            break;
          }
        }
      }
    }

    // Look for HTML content without code blocks
    if (!extractedCode && (response.includes('<!DOCTYPE html>') || response.includes('<html'))) {
      const lines = response.split('\n');
      const htmlStart = lines.findIndex(line => 
        line.includes('<!DOCTYPE html>') || line.includes('<html')
      );
      
      if (htmlStart !== -1) {
        const htmlEnd = lines.findIndex((line, index) => 
          index > htmlStart && line.includes('</html>')
        );
        
        if (htmlEnd !== -1) {
          extractedCode = lines.slice(htmlStart, htmlEnd + 1).join('\n');
        }
      }
    }

    // If we found HTML code, process and fix images
    if (extractedCode) {
      return this.processAndFixImages(extractedCode);
    }

    return null;
  }

  // Check if response contains code (more comprehensive detection)
  containsCode(response: string): boolean {
    return response.includes('```') || 
           response.includes('<!DOCTYPE html>') || 
           response.includes('<html') ||
           response.includes('<head>') ||
           response.includes('<body>') ||
           response.includes('<div') ||
           response.includes('<meta') ||
           response.includes('<style') ||
           response.includes('<script') ||
           /class="[^"]*"/i.test(response) ||
           /style="[^"]*"/i.test(response);
  }

  // Image service configurations
  private getImageServices() {
    return {
      unsplash: {
        people: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face'
        ],
        business: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1553028826-f4804151e2e0?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'
        ],
        nature: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop'
        ],
        technology: [
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop', // code on screen
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', // laptop with website
          'https://images.unsplash.com/photo-1558655146-364adea1fcc9?w=800&h=600&fit=crop', // UI/UX design workspace
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', // dashboard analytics
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop' // mobile app screen
        ],
        food: [
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&h=600&fit=crop'
        ],
        abstract: [
          'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&h=600&fit=crop'
        ]
      },
      picsum: (width: number, height: number) => `https://picsum.photos/${width}/${height}`,
      placehold: (width: number, height: number, bgColor?: string, textColor?: string, text?: string) => {
        const bg = bgColor || '6366f1';
        const fg = textColor || 'ffffff';
        const textParam = text ? `?text=${encodeURIComponent(text)}` : '';
        return `https://placehold.co/${width}x${height}/${bg}/${fg}${textParam}`;
      },
      placeholder: (width: number, height: number, text?: string) => 
        `https://via.placeholder.com/${width}x${height}/6366f1/ffffff?text=${encodeURIComponent(text || 'Image')}`
    };
  }

  // Smart image replacement based on context
  private getContextualImage(context: string, altText: string = '', width: number = 800, height: number = 600): string {
    const services = this.getImageServices();
    const lowerContext = (context + ' ' + altText).toLowerCase();
    
    // Determine category based on context
    if (lowerContext.includes('person') || lowerContext.includes('people') || lowerContext.includes('team') || 
        lowerContext.includes('profile') || lowerContext.includes('avatar') || lowerContext.includes('user')) {
      const images = services.unsplash.people;
      return images[Math.floor(Math.random() * images.length)];
    }
    
    if (lowerContext.includes('business') || lowerContext.includes('office') || lowerContext.includes('meeting') || 
        lowerContext.includes('corporate') || lowerContext.includes('professional')) {
      const images = services.unsplash.business;
      return images[Math.floor(Math.random() * images.length)];
    }
    
    if (lowerContext.includes('nature') || lowerContext.includes('landscape') || lowerContext.includes('outdoor') || 
        lowerContext.includes('forest') || lowerContext.includes('mountain') || lowerContext.includes('ocean')) {
      const images = services.unsplash.nature;
      return images[Math.floor(Math.random() * images.length)];
    }
    
    if (lowerContext.includes('tech') || lowerContext.includes('computer') || lowerContext.includes('digital') || 
        lowerContext.includes('software') || lowerContext.includes('coding') || lowerContext.includes('laptop') ||
        lowerContext.includes('react') || lowerContext.includes('next') || lowerContext.includes('javascript') ||
        lowerContext.includes('typescript') || lowerContext.includes('python') || lowerContext.includes('html') ||
        lowerContext.includes('css') || lowerContext.includes('development') || lowerContext.includes('programming') ||
        lowerContext.includes('app') || lowerContext.includes('website') || lowerContext.includes('ui') ||
        lowerContext.includes('ux') || lowerContext.includes('portfolio') || lowerContext.includes('project') ||
        lowerContext.includes('dashboard') || lowerContext.includes('interface')) {
      const images = services.unsplash.technology;
      return images[Math.floor(Math.random() * images.length)];
    }
    
    if (lowerContext.includes('food') || lowerContext.includes('restaurant') || lowerContext.includes('cooking') || 
        lowerContext.includes('meal') || lowerContext.includes('cuisine') || lowerContext.includes('dining')) {
      const images = services.unsplash.food;
      return images[Math.floor(Math.random() * images.length)];
    }
    
    if (lowerContext.includes('abstract') || lowerContext.includes('pattern') || lowerContext.includes('design') || 
        lowerContext.includes('art') || lowerContext.includes('creative')) {
      const images = services.unsplash.abstract;
      return images[Math.floor(Math.random() * images.length)];
    }
    
    // Default to placehold.co for generic placeholders
    return services.placehold(width, height, 'f3f4f6', '374151', 'Image');
  }

  // Process HTML to fix image URLs
  processAndFixImages(html: string): string {
    // Replace various placeholder patterns with working images
    let processedHtml = html;
    
    // Match img tags and extract relevant information
    processedHtml = processedHtml.replace(/<img([^>]*?)src=["']([^"']*?)["']([^>]*?)>/gi, (match, before, src, after) => {
      const altMatch = match.match(/alt=["']([^"']*?)["']/i);
      const altText = altMatch ? altMatch[1] : '';
      
      const widthMatch = match.match(/width=["']?(\d+)["']?/i);
      const heightMatch = match.match(/height=["']?(\d+)["']?/i);
      const width = widthMatch ? parseInt(widthMatch[1]) : 800;
      const height = heightMatch ? parseInt(heightMatch[1]) : 600;
      
      // Check if the image src needs replacement
      const needsReplacement = 
        src.includes('placeholder') ||
        src.includes('example.com') ||
        src.includes('your-image') ||
        src.includes('image-url') ||
        src.includes('path/to') ||
        src === '#' ||
        src === '' ||
        src.includes('lorem') ||
        !src.includes('http');
      
      if (needsReplacement) {
        // Get contextual image based on surrounding content and alt text
        const contextContent = html.substring(Math.max(0, html.indexOf(match) - 200), html.indexOf(match) + 200);
        const newSrc = this.getContextualImage(contextContent, altText, width, height);
        return `<img${before}src="${newSrc}"${after}>`;
      }
      
      return match;
    });
    
    // Also handle CSS background images
    processedHtml = processedHtml.replace(/background-image:\s*url\(["']?([^"')]*?)["']?\)/gi, (match, url) => {
      const needsReplacement = 
        url.includes('placeholder') ||
        url.includes('example.com') ||
        url.includes('your-image') ||
        url.includes('image-url') ||
        url === '#' ||
        url === '' ||
        !url.includes('http');
      
      if (needsReplacement) {
        const services = this.getImageServices();
        const newUrl = services.placehold(1200, 800, 'f3f4f6', '374151', 'Background'); // Default size for backgrounds
        return `background-image: url(${newUrl})`;
      }
      
      return match;
    });
    
    return processedHtml;
  }

  // Remove code blocks from response to keep chat clean
  removeCodeFromResponse(response: string): string {
    // Remove all code blocks (```...```)
    let cleanResponse = response.replace(/```[\s\S]*?```/g, '');
    
    // Remove any line that contains HTML tags
    cleanResponse = cleanResponse
      .split('\n')
      .filter(line => {
        const trimmedLine = line.trim().toLowerCase();
        // Keep lines that DON'T contain HTML
        return !(trimmedLine.includes('<') && trimmedLine.includes('>')) &&
               !trimmedLine.includes('<!doctype') &&
               !trimmedLine.includes('<html') &&
               !trimmedLine.includes('<head') &&
               !trimmedLine.includes('<body') &&
               !trimmedLine.includes('<div') &&
               !trimmedLine.includes('<meta') &&
               !trimmedLine.includes('<style') &&
               !trimmedLine.includes('<script') &&
               !trimmedLine.includes('class=') &&
               !trimmedLine.includes('style=') &&
               !trimmedLine.includes('</');
      })
      .join('\n');
    
    // Remove any remaining HTML-like content
    cleanResponse = cleanResponse.replace(/<[^>]*>/g, '');
    
    // Clean up extra whitespace
    cleanResponse = cleanResponse.replace(/\n\s*\n/g, '\n').trim();
    
    // If we removed code and the response is now very short or empty, return a default message
    if (this.containsCode(response) && cleanResponse.length < 20) {
      return 'I\'ve created your website! Check it out in the editor.';
    }
    
    return cleanResponse || 'Website generated successfully!';
  }
}

// Singleton instance
export const geminiService = new GeminiService();