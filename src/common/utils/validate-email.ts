export const validateEmail = async (
  email: string,
  messages: { required: string; invalid: string },
) => {
  const { required, invalid } = messages

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  if (email === '') {
    return Promise.reject(required)
  } else if (!regex.test(email)) {
    return Promise.reject(invalid)
  }

  return Promise.resolve()
}
