"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PseudoRandom = void 0;
/**
 * imitate VC srand/rand
 */
class PseudoRandom {
    constructor(n) {
        this.n = n;
    }
    srand(n) {
        this.n = n;
    }
    rand() {
        this.n = (this.n * 214013) | (0 + 2531011) | 0;
        return (this.n >> 16) & PseudoRandom.RAND_MAX;
    }
}
exports.PseudoRandom = PseudoRandom;
PseudoRandom.RAND_MAX = 0x7fff;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvcmFuZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHNldWRvcmFuZG9tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0gsTUFBYSxZQUFZO0lBR3JCLFlBQW9CLENBQVM7UUFBVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO0lBQUcsQ0FBQztJQUVqQyxLQUFLLENBQUMsQ0FBUztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztJQUNsRCxDQUFDOztBQVpMLG9DQWFDO0FBWjBCLHFCQUFRLEdBQUcsTUFBTSxDQUFDIn0=