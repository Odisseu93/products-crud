import * as crypto from 'crypto'

export const idGenerator = (
  prefix?: string,
  length = 12
): { generate: () => string } => {
  const generate = (): string => {
    // Generate a cryptographically secure random ID
    const randomBytes = crypto.randomBytes(Math.floor(length / 2))

    // Convert to hexadecimal string
    const id = randomBytes.toString('hex').slice(0, length)

    // Optionally add a prefix if provided
    if (prefix) {
      return prefix + id
    } else {
      return id
    }
  }

  return { generate }
}
