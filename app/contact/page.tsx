'use client'

import React, { useState } from 'react'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 pt-[68px] dark:text-white">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            {submitted ? (
                <p className="text-lg leading-relaxed text-green-500">
                    Thank you for reaching out! We will get back to you shortly.
                </p>
            ) : (
                <>
                    <p className="mb-4 text-lg leading-relaxed">
                        Have questions or feedback? Feel free to send us a
                        message.
                    </p>
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                                htmlFor="message"
                            >
                                Message
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-lustrous-gold hover:bg-gold-darker text-deep-charcoal  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}

export default ContactUs
