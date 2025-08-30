import NotePreview from "./NotePreview.client";

interface PageProps {
    params: Promise<{ id: string }>
}

const Page = async ({params}: PageProps) => {
    const {id} = await params;
    return <NotePreview id={id} />;
};

export default Page;