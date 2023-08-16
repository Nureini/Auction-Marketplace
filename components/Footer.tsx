const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-lustrous-gold text-white py-6 w-full">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    © {currentYear} PrestigeAuctions. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
