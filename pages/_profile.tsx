import React, { useState } from 'react';
import { Button, Modal } from "flowbite-react";

const Profile: React.FC<{ title: string, image: string }> = ({ title, image }) => {

    const [openModal, setOpenModal] = useState(true);

    return (
        <div className="p-2 rounded-2xl bg-white dark:bg-gray-400 p-1 shadow-xl relative h-[21rem] w-full">
            <div className="p-2 rounded-2xl p-1 relative bg-no-repeat bg-center bg-cover h-[20rem] w-full"
                style={{ backgroundImage: `url("${image}")` }}>
            </div>
            <div className="mt-4 p-0 text-center align-middle">
                <button className="block w-full select-none rounded-lg bg-white py-2 px-7 font-bold uppercase shadow-md transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] hover:bg-gray-100 focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button" data-ripple-dark="true" onClick={() => setOpenModal(true)}>
                    {title}
                </button>
            </div>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                            companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                            to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                            soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Profile;
