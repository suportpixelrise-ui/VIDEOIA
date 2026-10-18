import React, { useId } from "react";

// Original technical illustration. Not a Tesla CAD model or a frame from the event.
export const Car: React.FC<{
  frame: number;
  cutaway?: number;
  roll?: number;
  white?: boolean;
}> = ({ frame, cutaway = 0, roll = 0, white = true }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 400"
      fill="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id={`${id}-body`}
          x1="400"
          y1="130"
          x2="500"
          y2="330"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={white ? "#f6f8fc" : "#e64636"} />
          <stop offset=".4" stopColor={white ? "#b6c2d0" : "#9e211b"} />
          <stop offset=".49" stopColor={white ? "#eef4fa" : "#fa5d3c"} />
          <stop offset="1" stopColor={white ? "#344354" : "#501c22"} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="410" y1="110" x2="590" y2="220">
          <stop stopColor="#111a29" />
          <stop offset=".45" stopColor="#6a7685" />
          <stop offset=".53" stopColor="#e6c191" />
          <stop offset=".63" stopColor="#243448" />
          <stop offset="1" stopColor="#09101d" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x2="1" y2="1">
          <stop stopColor="#a0b5c8" />
          <stop offset=".5" stopColor="#172839" />
          <stop offset="1" stopColor="#e8f2fc" />
        </linearGradient>
        <linearGradient id={`${id}-skirt`}>
          <stop stopColor="#152436" />
          <stop offset=".5" stopColor="#0d1724" />
          <stop offset="1" stopColor="#314b64" />
        </linearGradient>
      </defs>
      {[
        { x: 260, r: 64 },
        { x: 780, r: 66 },
      ].map(({ x, r }) => (
        <g key={x} transform={`translate(${x},307)`}>
          <circle r={r + 5} fill="#03070d" stroke="#253346" strokeWidth="3" />
          <circle
            r={r - 10}
            fill="#121e2c"
            stroke={`url(#${id}-rim)`}
            strokeWidth="5"
          />
          <path d="M22-36Q42-20 34 18" stroke="#b26835" strokeWidth="13" />
          <g transform={`rotate(${frame * roll})`}>
            {Array.from({ length: 10 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 36})`}>
                <path d="M-5-11L-9-46 1-52 8-10Z" fill={`url(#${id}-rim)`} />
                <path d="M0-14L-1-47" stroke="#d8e6f3" strokeWidth="1" />
              </g>
            ))}
          </g>
          <circle r="14" fill="#495c70" stroke="#a3b8cd" strokeWidth="2" />
          <circle r="5" fill="#bcd3e6" />
        </g>
      ))}
      <g opacity={1 - cutaway * 0.74}>
        <path
          d="M85 281L108 230Q180 204 290 190L360 149Q439 104 553 130L684 194Q792 196 908 227L947 258 939 293 862 311Q851 232 780 231 705 232 700 311L342 318Q337 234 260 234 188 234 181 313L110 306 85 291Z"
          fill={`url(#${id}-body)`}
          stroke="#c9e0ee"
          strokeWidth="1.6"
        />
        <path
          d="M305 190L371 152Q446 121 548 140L651 193Z"
          fill={`url(#${id}-glass)`}
          stroke="#b59169"
          strokeWidth="1.8"
        />
        <path d="M524 138L580 195" stroke="#b1b9bb" strokeWidth="5" />
        <path d="M333 191L358 169" stroke="#f4e0b7" strokeWidth="2" />
        <path
          d="M321 204Q470 193 685 209L664 287Q485 302 353 293Z"
          stroke="#304557"
          strokeWidth="2"
        />
        <path d="M330 211Q460 205 650 213" stroke="#f5f8fc" strokeWidth="2.6" />
        <path
          d="M675 203L881 235 850 254 676 244"
          stroke="#6a7e90"
          strokeWidth="1.7"
        />
        <path
          d="M349 307L691 299 688 316 350 324Z"
          fill={`url(#${id}-skirt)`}
        />
        <path d="M360 311L672 304" stroke="#5f9bc6" strokeWidth="2" />
        <path d="M129 228L206 214 211 229 133 241Z" fill="#ee5956" />
        <path d="M136 227L202 217" stroke="#ffb1a1" strokeWidth="3" />
        <path d="M861 239L925 252 933 263 863 254Z" fill="#e9f8ff" />
        <path d="M866 245L922 256" stroke="#8dcfff" strokeWidth="3" />
        <path d="M900 276L943 274 936 291 874 300Z" fill="#101b29" />
        <path d="M108 274L173 270 171 292 119 294Z" fill="#101925" />
        <path
          d="M611 224L642 223"
          stroke="#253e55"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M105 252Q165 242 189 244M354 263Q490 249 666 256"
          stroke="#fff"
          strokeWidth="1.8"
          opacity=".45"
        />
        <path d="M706 215L685 244 682 271" stroke="#718799" strokeWidth="2" />
        <path
          d="M338 198L313 184 297 188 307 202Z"
          fill="#273b51"
          stroke="#b0cadb"
        />
      </g>
      <g opacity={cutaway} stroke="#55baff" strokeWidth="2">
        <path d="M180 303L338 312 702 306 857 298" strokeDasharray="8 6" />
        <rect
          x="379"
          y="221"
          width="215"
          height="65"
          rx="30"
          fill="#008cff22"
        />
        <path d="M378 253H201L161 264" strokeWidth="5" />
        <path d="M594 253H655L678 284" />
        <circle cx="235" cy="252" r="10" fill="#008cff" />
      </g>
    </svg>
  );
};
