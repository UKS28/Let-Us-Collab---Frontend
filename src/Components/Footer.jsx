import React from 'react'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 mt-6 fixed bottom-0 left-0 w-full">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by @Let us Collab</p>
      </aside>
    </footer>
  )
}

export default Footer