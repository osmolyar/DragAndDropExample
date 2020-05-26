import colors from "colors"
import { argv } from "yargs"

const multiplier = (argv.speed as number) || 1

console.info(colors.cyan(`browser.pause speed multiplier is: ${multiplier}x`))
const speed = {
  fast: 250 * multiplier,
  faster: 500 * multiplier,
  normal: 1000 * multiplier,
  slower: 2000 * multiplier,
  slow: 5000 * multiplier,
  snail: 1000 * multiplier,
  implicit: 1000 * multiplier,
  maxSpec: Math.max(15000, 15000 * multiplier),
  multiplier: multiplier,
}

export const { fast, faster, normal, slower, slow, snail, implicit, maxSpec } = speed

export default speed
