import { routes } from "./routes"

describe('Routes', () => {
  it('should be equal', () => {
    expect(routes).toEqual([
      { path: '/healthcheck' },
      { path: '/class' },
    ])
  })

  it('should be equal in count of items', () => {
    expect(routes.length).toEqual(2)
  })
})
