import { render, screen } from '@testing-library/react'
import UserStatus from '@/components/userStatus'

describe('UserStatus', () => {
  it('renders without crashing', () => {
    render(<UserStatus />)
    expect(screen.getByTestId('status')).toBeInTheDocument()
  })
})
