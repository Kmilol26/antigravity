import { getSpace } from "@/app/actions";
import { SpaceForm } from "@/components/spaces/SpaceForm";
import { notFound } from "next/navigation";

export default async function EditSpacePage({ params }: { params: { id: string } }) {
    const space = await getSpace(params.id);

    if (!space) {
        notFound();
    }

    return (
        <div className="px-6">
            <SpaceForm space={space} />
        </div>
    );
}
