export const AppRoutes = [{
  path: '/',
  async lazy () {
    const { default: Layout } = await import('../Layout/Main')
    return { Component: Layout }
  },
  children: [
    {
      index: true,
      async lazy () {
        const { Dashboard } = await import('../Page/Dashboard')
        return { Component: Dashboard }
      }
    }
  ]
}]
