import { useState } from "react";


const GeneratePainting = () => {
    const [images, setImages] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = new FormData()
        form.append('prompt', e.target.prompt.value)

        await fetch('https://clipdrop-api.co/text-to-image/v1', {
            method: 'POST',
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY,
            },
            body: form,
        })
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const blob = new Blob([buffer], { type: 'image/jpeg' })
                const image_url = URL.createObjectURL(blob)
                setImages([image_url, ...images])


                // buffer here is a binary representation of the returned image
            })
    }

    console.log(images);
    return (
        <div className="container mx-auto max-w-[1400px] flex items-center justify-center pt-16">
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="text-neutral-800 py-6 relative overflow-hidden flex flex-col justify-around w-96 h-44 border border-neutral-500 rounded-lg bg-neutral-50 p-3 px-6"
                >
                    <div
                        className="before:absolute before:w-32 before:h-20 before:right-2 before:bg-rose-300 before:-z-10 before:rounded-full before:blur-xl before:-top-12 z-10 after:absolute after:w-24 after:h-24 after:bg-purple-300 after:-z-10 after:rounded-full after:blur after:-top-12 after:-right-6"
                    >
                        <span className="font-extrabold text-2xl text-violet-600"
                        >Generate Paintings</span>


                    </div>
                    <div className="flex gap-1">
                        <div
                            className="relative rounded-lg w-64 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg"
                        >
                            <input
                                type="text"
                                name="prompt"
                                className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                                placeholder="What kind of painting do you want?"
                            />
                        </div>
                        <button
                            className="bg-violet-500 text-neutral-50 p-2 rounded-lg hover:bg-violet-400"
                        >
                            Generate
                        </button>
                    </div>
                </form>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 pt-9">
                    {
                        images?.map((image, i) => (
                            <div key={i}>
                                <img src={image} alt="" className="w-96 h-96" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default GeneratePainting