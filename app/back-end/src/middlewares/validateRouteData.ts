import v from 'vkrun'

export const validateRouteData =
  (requestSchema: v.SchemaReturn) =>
  (req: v.Request, res: v.Response, next: v.NextFunction) => {
    const validatedSchema = requestSchema.test(req, 'requestSchema')

    if (validatedSchema.errors.length > 0) {
      return res.status(400).json({
        message: validatedSchema.errors.map(err => err.message).join(' '),
      })
    }

    next()
  }
