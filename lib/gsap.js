import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  CustomEase,
  Observer,
  ScrollToPlugin,
  DrawSVGPlugin,
  ScrambleTextPlugin
);

/* one shared ease so every animation has the same personality */
CustomEase.create('webrivo', 'M0,0 C0.16,1 0.3,1 1,1');
CustomEase.create('webrivoIn', 'M0,0 C0.7,0 0.84,0 1,1');

ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, Observer, CustomEase };
