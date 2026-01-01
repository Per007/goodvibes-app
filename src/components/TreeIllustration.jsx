import React from 'react';

/**
 * TreeIllustration Component
 * 
 * Toont een boom-illustratie gebaseerd op het huidige level (1-16).
 * Stijl: Symmetrisch Organisch met zichtbare takken en bladclusters.
 * 
 * Props:
 * - level: number (1-16) - Het huidige level van de boom
 * - weather: object (optional) - Weather state voor visuele effecten
 * - className: string (optional) - Extra CSS classes
 */

const TreeIllustration = ({ level = 1, weather = { id: 'clear' }, className = '' }) => {
  // Kleuren - consistent met de rest van de app
  const leafDark = '#166534';    // Donkergroen
  const leafMid = '#22C55E';     // Middengroen
  const leafLight = '#4ADE80';   // Lichtgroen
  const leafHighlight = '#86EFAC'; // Highlight groen
  const trunk = '#8B5A2B';       // Bruine stam
  const trunkLight = '#D97706';  // Lichtere stam
  
  // Speciale kleuren voor hogere levels
  const gold = '#FBBF24';        // Goud voor bloemen
  const pink = '#F472B6';        // Roze voor bloemen
  const red = '#EF4444';         // Rood voor fruit
  const orange = '#F97316';      // Oranje voor fruit
  const purple = '#9333EA';      // Paars voor magische boom
  const magenta = '#EC4899';     // Magenta voor kosmische boom
  const cosmic = '#F0ABFC';      // Kosmisch lichtpaars
  
  // Sparkle kleuren
  const sparkle = '#FEF9C3';     // Geel/wit voor sparkles
  
  // Weather effecten
  const getTreeFilter = () => {
    if (weather.id === 'hot') return 'brightness(1.1) saturate(1.2)';
    if (weather.id === 'stormy') return 'brightness(0.7)';
    if (weather.id === 'foggy') return 'brightness(0.9)';
    if (weather.id === 'rainy') return 'brightness(0.85)';
    return 'none';
  };

  const getTreeAnimation = () => {
    if (weather.id === 'windy') return 'sway 3s ease-in-out infinite';
    if (weather.id === 'stormy') return 'shake 0.5s ease-in-out infinite';
    return 'none';
  };

  // Render de juiste boom gebaseerd op level
  const renderTreeByLevel = () => {
    // Level 1: Zaadje
    if (level === 1) {
      return (
        <g>
          {/* Schaduw op de grond */}
          <ellipse cx="150" cy="235" rx="40" ry="12" fill="#654321" opacity="0.3" />
          {/* Zaadje */}
          <ellipse cx="150" cy="222" rx="16" ry="20" fill="#8B6914" />
          {/* Kleine scheut */}
          <path d="M150 208 Q154 195 150 180" stroke={leafLight} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    }

    // Level 2: Ontkiemend
    if (level === 2) {
      return (
        <g>
          <ellipse cx="150" cy="235" rx="40" ry="12" fill="#654321" opacity="0.3" />
          {/* Stengel */}
          <path d="M150 235 L150 175" stroke={trunk} strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Twee blaadjes */}
          <ellipse cx="132" cy="168" rx="18" ry="10" fill={leafHighlight} transform="rotate(-15 132 168)" />
          <ellipse cx="168" cy="168" rx="16" ry="9" fill={leafLight} transform="rotate(15 168 168)" />
        </g>
      );
    }

    // Level 3: Eerste Scheut
    if (level === 3) {
      return (
        <g>
          <ellipse cx="150" cy="238" rx="42" ry="12" fill="#654321" opacity="0.3" />
          {/* Stam */}
          <path d="M150 238 L150 160" stroke={trunk} strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M150 195 L120 175" stroke={trunk} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M150 175 L180 155" stroke={trunk} strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Bladclusters */}
          <circle cx="115" cy="170" r="18" fill={leafLight} />
          <circle cx="185" cy="150" r="16" fill={leafHighlight} />
          <circle cx="150" cy="140" r="22" fill={leafMid} />
        </g>
      );
    }

    // Level 4: Kiemplant
    if (level === 4) {
      return (
        <g>
          <ellipse cx="150" cy="240" rx="45" ry="12" fill="#654321" opacity="0.3" />
          {/* Stam */}
          <path d="M150 240 L150 145" stroke={trunk} strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M150 210 L108 185 M150 180 L192 155 M150 160 L115 135" stroke={trunk} strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Bladclusters */}
          <circle cx="102" cy="180" r="20" fill={leafLight} />
          <circle cx="198" cy="150" r="18" fill={leafMid} />
          <circle cx="110" cy="130" r="19" fill={leafHighlight} />
          <circle cx="150" cy="118" r="24" fill={leafDark} />
        </g>
      );
    }

    // Level 5: Jonge Plant
    if (level === 5) {
      return (
        <g>
          <ellipse cx="150" cy="242" rx="48" ry="12" fill="#654321" opacity="0.3" />
          {/* Stam */}
          <path d="M150 242 L150 130" stroke={trunk} strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M150 218 L95 195 M150 195 L205 165 M150 170 L100 140 M150 150 L195 120" stroke={trunk} strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Bladclusters */}
          <circle cx="88" cy="190" r="22" fill={leafLight} />
          <circle cx="212" cy="160" r="20" fill={leafMid} />
          <circle cx="95" cy="135" r="21" fill={leafHighlight} />
          <circle cx="200" cy="115" r="18" fill={leafDark} />
          <circle cx="150" cy="100" r="26" fill={leafLight} />
        </g>
      );
    }

    // Level 6: Struikje
    if (level === 6) {
      return (
        <g>
          <ellipse cx="150" cy="244" rx="50" ry="12" fill="#654321" opacity="0.3" />
          {/* Stam */}
          <path d="M150 244 L150 120" stroke={trunk} strokeWidth="10" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M150 220 L82 195 M150 195 L218 165 M150 170 L90 140 M150 150 L210 120 M150 135 L115 100" stroke={trunk} strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Bladclusters */}
          <circle cx="75" cy="190" r="24" fill={leafLight} />
          <circle cx="225" cy="160" r="22" fill={leafMid} />
          <circle cx="85" cy="135" r="23" fill={leafHighlight} />
          <circle cx="215" cy="115" r="20" fill={leafDark} />
          <circle cx="110" cy="95" r="22" fill={leafLight} />
          <circle cx="155" cy="80" r="26" fill={leafMid} />
        </g>
      );
    }

    // Level 7: Grote Struik
    if (level === 7) {
      return (
        <g>
          <ellipse cx="150" cy="246" rx="52" ry="12" fill="#654321" opacity="0.3" />
          {/* Stam */}
          <path d="M150 246 L150 110" stroke={trunk} strokeWidth="10" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M150 225 L68 195 M150 200 L232 168 M150 175 L80 140 M150 155 L220 125 M150 138 L100 100 M150 125 L195 85" stroke={trunk} strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Bladclusters */}
          <circle cx="62" cy="190" r="26" fill={leafLight} />
          <circle cx="238" cy="163" r="24" fill={leafMid} />
          <circle cx="75" cy="135" r="25" fill={leafHighlight} />
          <circle cx="225" cy="120" r="22" fill={leafDark} />
          <circle cx="95" cy="95" r="24" fill={leafLight} />
          <circle cx="200" cy="80" r="22" fill={leafMid} />
          <circle cx="155" cy="65" r="28" fill={leafDark} />
        </g>
      );
    }

    // Level 8: Jonge Boom
    if (level === 8) {
      return (
        <g>
          <ellipse cx="150" cy="250" rx="55" ry="12" fill="#654321" opacity="0.3" />
          {/* Stam */}
          <path d="M150 250 L150 100" stroke={trunk} strokeWidth="12" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M150 230 L55 195 M150 205 L245 165 M150 180 L65 140 M150 160 L235 125 M150 140 L85 95 M150 120 L215 80" stroke={trunk} strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Bladclusters */}
          <circle cx="48" cy="190" r="28" fill={leafLight} />
          <circle cx="252" cy="160" r="26" fill={leafMid} />
          <circle cx="58" cy="135" r="27" fill={leafHighlight} />
          <circle cx="242" cy="120" r="24" fill={leafDark} />
          <circle cx="78" cy="90" r="26" fill={leafLight} />
          <circle cx="222" cy="75" r="24" fill={leafMid} />
          <circle cx="155" cy="55" r="30" fill={leafDark} />
        </g>
      );
    }

    // Level 9: Bloeiende Boom
    if (level === 9) {
      return (
        <g>
          <ellipse cx="150" cy="250" rx="55" ry="12" fill="#654321" opacity="0.3" />
          {/* Stam */}
          <path d="M150 250 L150 95" stroke={trunk} strokeWidth="12" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M150 232 L48 190 M150 207 L252 158 M150 182 L58 135 M150 160 L242 115 M150 140 L78 85 M150 118 L222 70" stroke={trunk} strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Bladclusters */}
          <circle cx="42" cy="185" r="28" fill={leafLight} />
          <circle cx="258" cy="153" r="26" fill={leafMid} />
          <circle cx="52" cy="130" r="27" fill={leafHighlight} />
          <circle cx="248" cy="110" r="24" fill={leafDark} />
          <circle cx="72" cy="80" r="26" fill={leafLight} />
          <circle cx="228" cy="65" r="24" fill={leafMid} />
          <circle cx="155" cy="45" r="30" fill={leafDark} />
          {/* Bloemen */}
          <circle cx="35" cy="175" r="8" fill={gold} />
          <circle cx="268" cy="145" r="7" fill={pink} />
          <circle cx="58" cy="118" r="6" fill={gold} />
          <circle cx="242" cy="100" r="7" fill={pink} />
          <circle cx="160" cy="35" r="8" fill={gold} />
        </g>
      );
    }

    // Level 10: Fruitboom
    if (level === 10) {
      return (
        <g>
          <ellipse cx="150" cy="250" rx="55" ry="12" fill="#654321" opacity="0.3" />
          {/* Stam */}
          <path d="M150 250 L150 88" stroke={trunk} strokeWidth="14" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M150 235 L40 188 M150 210 L260 155 M150 185 L50 130 M150 163 L250 108 M150 142 L70 78 M150 120 L230 62" stroke={trunk} strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* Bladclusters */}
          <circle cx="33" cy="183" r="30" fill={leafLight} />
          <circle cx="267" cy="150" r="28" fill={leafMid} />
          <circle cx="43" cy="125" r="29" fill={leafHighlight} />
          <circle cx="257" cy="103" r="26" fill={leafDark} />
          <circle cx="63" cy="73" r="28" fill={leafLight} />
          <circle cx="237" cy="57" r="26" fill={leafMid} />
          <circle cx="158" cy="38" r="32" fill={leafDark} />
          {/* Vruchten */}
          <circle cx="28" cy="173" r="10" fill={red} />
          <circle cx="275" cy="142" r="9" fill={red} />
          <circle cx="50" cy="115" r="8" fill={orange} />
          <circle cx="250" cy="95" r="10" fill={red} />
          <circle cx="165" cy="28" r="9" fill={orange} />
        </g>
      );
    }

    // Level 11: Schaduwrijke Boom
    if (level === 11) {
      return (
        <g>
          <ellipse cx="150" cy="254" rx="60" ry="14" fill="#654321" opacity="0.4" />
          {/* Stam */}
          <path d="M150 254 L150 75" stroke={trunk} strokeWidth="16" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M150 240 L30 185 M150 215 L270 148 M150 190 L40 125 M150 168 L260 100 M150 148 L55 65 M150 128 L245 48" stroke={trunk} strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Bladclusters */}
          <circle cx="23" cy="180" r="32" fill={leafMid} />
          <circle cx="277" cy="143" r="30" fill={leafLight} />
          <circle cx="33" cy="120" r="31" fill={leafDark} />
          <circle cx="267" cy="95" r="28" fill={leafHighlight} />
          <circle cx="48" cy="60" r="30" fill={leafMid} />
          <circle cx="252" cy="43" r="28" fill={leafLight} />
          <circle cx="160" cy="28" r="34" fill={leafDark} />
          <circle cx="10" cy="170" r="26" fill={leafLight} />
          <circle cx="290" cy="135" r="24" fill={leafMid} />
        </g>
      );
    }

    // Level 12: Eeuwenoude Boom
    if (level === 12) {
      return (
        <g>
          <ellipse cx="150" cy="258" rx="65" ry="14" fill="#654321" opacity="0.4" />
          {/* Dikke stam met curve */}
          <path d="M140 258 Q125 200 150 140 Q175 80 150 50" stroke={trunk} strokeWidth="20" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M145 238 L18 180 M155 215 L282 140 M140 192 L28 118 M160 170 L272 88 M145 148 L45 55 M155 128 L255 38" stroke={trunk} strokeWidth="9" fill="none" strokeLinecap="round" />
          {/* Bladclusters */}
          <circle cx="10" cy="175" r="34" fill={leafMid} />
          <circle cx="290" cy="135" r="32" fill={leafLight} />
          <circle cx="20" cy="113" r="33" fill={leafDark} />
          <circle cx="280" cy="83" r="30" fill={leafHighlight} />
          <circle cx="38" cy="50" r="32" fill={leafMid} />
          <circle cx="262" cy="33" r="30" fill={leafLight} />
          <circle cx="158" cy="18" r="36" fill={leafDark} />
          <circle cx="-2" cy="165" r="28" fill={leafLight} />
          <circle cx="302" cy="125" r="26" fill={leafMid} />
          {/* Wortel detail */}
          <ellipse cx="190" cy="240" rx="10" ry="22" fill={trunk} opacity="0.6" />
        </g>
      );
    }

    // Level 13: Heilige Boom (met glow)
    if (level === 13) {
      return (
        <g>
          <defs>
            <filter id="glow13">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <ellipse cx="150" cy="258" rx="65" ry="14" fill="#654321" opacity="0.4" />
          {/* Gele gloed */}
          <circle cx="155" cy="130" r="100" fill={sparkle} opacity="0.2" filter="url(#glow13)" />
          {/* Stam */}
          <path d="M140 258 Q120 190 150 130 Q180 70 150 35" stroke={trunk} strokeWidth="20" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M142 240 L8 170 M158 218 L292 130 M138 195 L18 115 M162 172 L282 78 M145 150 L35 48 M155 130 L265 28" stroke={trunk} strokeWidth="10" fill="none" strokeLinecap="round" />
          {/* Bladclusters met glow */}
          <circle cx="0" cy="165" r="35" fill={leafMid} filter="url(#glow13)" />
          <circle cx="300" cy="125" r="33" fill={leafLight} filter="url(#glow13)" />
          <circle cx="10" cy="110" r="34" fill={leafDark} />
          <circle cx="290" cy="73" r="31" fill={leafHighlight} />
          <circle cx="28" cy="43" r="33" fill={leafMid} />
          <circle cx="272" cy="23" r="31" fill={leafLight} />
          <circle cx="158" cy="8" r="38" fill={leafDark} filter="url(#glow13)" />
          <circle cx="-12" cy="155" r="29" fill={leafLight} />
          <circle cx="312" cy="115" r="27" fill={leafMid} />
          {/* Sparkles */}
          <circle cx="45" cy="175" r="6" fill={sparkle} />
          <circle cx="255" cy="135" r="5" fill={sparkle} />
          <circle cx="75" cy="70" r="4" fill={sparkle} />
          <circle cx="195" cy="40" r="6" fill={sparkle} />
        </g>
      );
    }

    // Level 14: Boom des Levens
    if (level === 14) {
      return (
        <g>
          <defs>
            <filter id="glow14">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="lifeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={leafDark} />
              <stop offset="100%" stopColor={leafHighlight} />
            </linearGradient>
          </defs>
          <ellipse cx="150" cy="258" rx="65" ry="14" fill="#654321" opacity="0.4" />
          {/* Groene aura */}
          <circle cx="160" cy="125" r="110" fill={leafHighlight} opacity="0.15" filter="url(#glow14)" />
          {/* Gradient stam */}
          <path d="M138 258 Q110 185 150 120 Q190 55 150 15" stroke="url(#lifeGrad)" strokeWidth="22" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M140 245 L-2 165 M160 222 L302 125 M135 200 L8 108 M165 177 L292 68 M143 155 L25 35 M157 135 L275 15" stroke={trunk} strokeWidth="10" fill="none" strokeLinecap="round" />
          {/* Bladclusters met glow */}
          <circle cx="-10" cy="160" r="38" fill={leafMid} filter="url(#glow14)" />
          <circle cx="310" cy="120" r="36" fill={leafLight} filter="url(#glow14)" />
          <circle cx="0" cy="103" r="37" fill={leafDark} />
          <circle cx="300" cy="63" r="34" fill={leafHighlight} />
          <circle cx="18" cy="30" r="36" fill={leafMid} />
          <circle cx="282" cy="10" r="34" fill={leafLight} />
          <circle cx="160" cy="-5" r="42" fill={leafDark} filter="url(#glow14)" />
          {/* Sparkles */}
          <circle cx="35" cy="170" r="7" fill={sparkle} />
          <circle cx="265" cy="130" r="7" fill={sparkle} />
          <circle cx="60" cy="60" r="6" fill={sparkle} />
          <circle cx="200" cy="35" r="7" fill={sparkle} />
          <circle cx="155" cy="165" r="5" fill={sparkle} />
          <circle cx="55" cy="118" r="5" fill={sparkle} />
        </g>
      );
    }

    // Level 15: Wereldboom
    if (level === 15) {
      return (
        <g>
          <defs>
            <filter id="glow15">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="cosmicGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={trunk} />
              <stop offset="50%" stopColor={purple} />
              <stop offset="100%" stopColor={magenta} />
            </linearGradient>
          </defs>
          <ellipse cx="150" cy="260" rx="68" ry="14" fill="#654321" opacity="0.4" />
          {/* Paarse aura */}
          <circle cx="165" cy="120" r="115" fill={purple} opacity="0.1" filter="url(#glow15)" />
          {/* Kosmische gradient stam */}
          <path d="M135 260 Q95 180 150 110 Q205 40 150 0" stroke="url(#cosmicGrad1)" strokeWidth="24" fill="none" strokeLinecap="round" />
          {/* Takken */}
          <path d="M138 248 L-15 158 M162 225 L315 115 M130 202 L0 98 M170 180 L300 55 M140 158 L15 20 M160 138 L285 -5" stroke={trunk} strokeWidth="11" fill="none" strokeLinecap="round" />
          {/* Bladclusters - mix van groen en paars */}
          <circle cx="-22" cy="153" r="40" fill={purple} opacity="0.7" filter="url(#glow15)" />
          <circle cx="322" cy="110" r="38" fill={magenta} opacity="0.7" filter="url(#glow15)" />
          <circle cx="-8" cy="93" r="39" fill={leafLight} />
          <circle cx="308" cy="50" r="36" fill={leafMid} />
          <circle cx="8" cy="15" r="38" fill={purple} opacity="0.8" />
          <circle cx="292" cy="-10" r="36" fill={magenta} opacity="0.8" />
          <circle cx="165" cy="-20" r="45" fill={leafLight} filter="url(#glow15)" />
          {/* Sterren */}
          <circle cx="25" cy="168" r="8" fill="white" />
          <circle cx="275" cy="128" r="7" fill="white" />
          <circle cx="55" cy="55" r="6" fill="white" />
          <circle cx="235" cy="25" r="8" fill="white" />
          <circle cx="165" cy="190" r="6" fill="white" />
          <circle cx="-5" cy="118" r="5" fill="white" />
          <circle cx="295" cy="78" r="5" fill="white" />
        </g>
      );
    }

    // Level 16: Kosmische Boom
    if (level >= 16) {
      return (
        <g>
          <defs>
            <filter id="glow16">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="cosmicGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={trunk} />
              <stop offset="30%" stopColor="#4C1D95" />
              <stop offset="70%" stopColor={purple} />
              <stop offset="100%" stopColor={cosmic} />
            </linearGradient>
            <radialGradient id="auraGrad">
              <stop offset="0%" stopColor={cosmic} stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="150" cy="262" rx="70" ry="14" fill="#4C1D95" opacity="0.5" />
          {/* Kosmische aura */}
          <circle cx="170" cy="115" r="125" fill="url(#auraGrad)" />
          {/* Kosmische gradient stam met glow */}
          <path d="M132 262 Q85 175 150 100 Q215 25 150 -15" stroke="url(#cosmicGrad2)" strokeWidth="26" fill="none" strokeLinecap="round" filter="url(#glow16)" />
          {/* Takken */}
          <path d="M135 252 L-25 148 M165 228 L325 105 M128 205 L-10 88 M172 182 L310 45 M138 160 L5 8 M162 140 L295 -18" stroke="#4C1D95" strokeWidth="12" fill="none" strokeLinecap="round" />
          {/* Kosmische bladclusters */}
          <circle cx="-32" cy="143" r="42" fill={purple} filter="url(#glow16)" />
          <circle cx="332" cy="100" r="40" fill={magenta} filter="url(#glow16)" />
          <circle cx="-18" cy="83" r="41" fill="#A855F7" />
          <circle cx="318" cy="40" r="38" fill="#F472B6" />
          <circle cx="-2" cy="3" r="40" fill={purple} />
          <circle cx="302" cy="-23" r="38" fill={magenta} />
          <circle cx="170" cy="-35" r="50" fill={cosmic} filter="url(#glow16)" />
          {/* Sterren met glow */}
          <circle cx="15" cy="160" r="9" fill="white" filter="url(#glow16)" />
          <circle cx="285" cy="118" r="9" fill="white" filter="url(#glow16)" />
          <circle cx="45" cy="48" r="8" fill="white" />
          <circle cx="255" cy="18" r="9" fill="white" filter="url(#glow16)" />
          <circle cx="175" cy="185" r="8" fill="white" />
          <circle cx="-15" cy="108" r="7" fill="white" />
          <circle cx="305" cy="68" r="7" fill="white" />
          {/* Extra sparkles */}
          <circle cx="75" cy="120" r="4" fill={sparkle} />
          <circle cx="205" cy="85" r="4" fill={sparkle} />
          <circle cx="165" cy="25" r="5" fill={sparkle} />
          {/* Kosmische ster bovenaan */}
          <polygon points="170,-40 173,-32 181,-34 175,-28 179,-20 170,-25 161,-20 165,-28 159,-34 167,-32" fill="white" />
        </g>
      );
    }

    // Fallback
    return null;
  };

  return (
    <svg
      viewBox="0 0 300 260"
      className={`w-full h-full ${className}`}
      style={{
        overflow: 'visible',
        filter: getTreeFilter(),
        animation: getTreeAnimation(),
        transformOrigin: 'bottom center',
      }}
    >
      {renderTreeByLevel()}
    </svg>
  );
};

export default TreeIllustration;
