import {
  NoneCourseWasFound
} from "./error.message"

describe('Constants', () => {
  it('should be equal', () => {
    expect(NoneCourseWasFound).toBe('Nenhum curso foi encontrado')
  })
})
