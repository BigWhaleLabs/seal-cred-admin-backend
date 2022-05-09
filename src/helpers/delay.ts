export default function delay(s: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, s * 1000))
}
