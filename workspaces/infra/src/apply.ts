export const apply = async (stack: string) => {
  if (!stack) throw new Error('Missing stack')
  if (!/^\w+$/.test(stack)) throw new Error('Stack must be one word')

  const { default: fn } = await import(`./stacks/${stack}.stack.js`)

  await fn()
}
