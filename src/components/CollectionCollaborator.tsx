import { useAppSelector } from "app/hooks";
import React, { FC, useEffect, useId, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import Glide from "@glidejs/glide";
import Heading from "./Heading/Heading";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import { COLORS, CONTRACT_ABI, CONTRACT_ADDRESS } from "constant";
import { useApi } from "hooks/useApi";
import { Modal, Tooltip } from "flowbite-react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { toast } from "react-toastify";
import useContract from "hooks/useContract";

interface Props {
  collection_id: string;
  collaborators: Collaboration[];
  is_collection_owner: boolean;
  getCollection: () => void;
}

const CollectionCollaborator: React.FC<Props> = ({
  collection_id,
  collaborators,
  is_collection_owner,
  getCollection,
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  const { t } = useTranslation();
  const api = useApi();
  const [collaboration, setDeleteCollaboration] =
    React.useState<Collaboration | null>(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const { contract } = useContract();

  useEffect(() => {
    if (!sliderRef.current) {
      return () => {};
    }

    const OPTIONS: any = {
      perView: 5,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 3.4,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.3,
        },
        500: {
          gap: 20,
          perView: 1.4,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [sliderRef, UNIQUE_CLASS]);

  const deleteCollaborator = async () => {
    if (!is_collection_owner || !collaboration) return;
    setDeleteLoading(true);
    try {
      await contract.removeCollaborators(
        +collection_id,
        collaboration?.user.wallet_address
      );
      await api.delete(`/collections-collaborators/${collaboration.id}`);
      getCollection();
      setDeleteLoading(false);
      setDeleteCollaboration(null);
      toast.success(t("Collaborator_deleted_successfully") as string);
    } catch (error: any) {
      setDeleteLoading(false);
      toast.error(error?.response?.data?.message || t("system_error") as string);
    }
  };

  return (
    <div className={``}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading desc={t("")} hasNextPrev>
          {t("Collection_Collaborators")}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {collaborators &&
              collaborators.map(
                ({ user, id }: Collaboration, index: number) => (
                  <li key={index} className={`glide__slide `}>
                    <div className={`flex flex-col `}>
                      <Link
                        to={`/author/${user.id}`}
                        className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group`}
                      >
                        <NcImage
                          src={user.profile_photo}
                          className="object-cover w-full h-full rounded-2xl"
                        />
                        <span className="absolute inset-0 transition-opacity bg-black opacity-0 group-hover:opacity-100 bg-opacity-10"></span>
                      </Link>
                      <div className="flex items-center justify-between gap-4 mt-4">
                        <h2
                          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
                        >
                          {user.username}
                        </h2>
                        {is_collection_owner && (
                          <Tooltip content="remove collaboration">
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteCollaboration({ id, user })
                              }
                              className="flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md bg-white/20"
                            >
                              <i className="text-lg font-medium bx bx-trash text-neutral-900 dark:text-neutral-100"></i>
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </li>
                )
              )}
          </ul>
        </div>
      </div>

      <Modal
        show={!!collaboration}
        onClose={() => setDeleteCollaboration(null)}
      >
        <Modal.Header>
          <p className="text-neutral-900 dark:text-neutral-100">
            {t("Are_you_sure_you_want_to_delete_this_collaborator")}
          </p>
        </Modal.Header>
        <Modal.Body>
          <p className="text-neutral-900 dark:text-neutral-100">
            {t(
              "This_collaborator_will_no_longer_be_able_to_edit_your_collection_or_add_any_new_NFTs"
            )}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <ButtonPrimary
            disabled={deleteLoading}
            loading={deleteLoading}
            onClick={deleteCollaborator}
          >
            {t("Confirm")}
          </ButtonPrimary>
          <ButtonSecondary onClick={() => setDeleteCollaboration(null)}>
            {t("Cancel")}
          </ButtonSecondary>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CollectionCollaborator;
