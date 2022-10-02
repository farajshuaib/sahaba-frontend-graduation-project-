import React, { FC, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import LikeSaveBtns from "./LikeSaveBtns";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import VerifyIcon from "components/VerifyIcon";
import TimeCountDown from "./TimeCountDown";
import TabDetail from "./TabDetail";
import ItemTypeVideoIcon from "components/ItemTypeVideoIcon";
import LikeButton from "components/LikeButton";
import AccordionInfo from "./AccordionInfo";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { useCrud } from "hooks/useCrud";
import { useHistory, useParams } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen";
import { useAppSelector } from "app/hooks";
import { toast } from "react-toastify";
import { BigNumber, Contract, ethers, utils } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "constant";
import { useApi } from "hooks/useApi";
import { parseEther } from "ethers/lib/utils";
import ServerError from "components/ServerError";
import { usdPrice } from "utils/functions";
import { Label, Modal } from "flowbite-react";
import Select from "shared/Select/Select";
import moment from "moment";
import FormItem from "components/FormItem";
import ItemTypeImageIcon from "components/ItemTypeImageIcon";
import AudioForNft from "components/AudioForNft";
import NftItem from "./NftItem";
export interface NftDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const NftDetailPage: FC<NftDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const params: any = useParams();
  const history = useHistory();
  const { library, account } = useWeb3React();
  const api = useApi();
  const userData: UserData = useAppSelector((state) => state.account.userData);
  const { item, loading, fetchById, errors } = useCrud("/nfts");
  const { create: submitBuyNft } = useCrud(`/nfts/buy/${params.id}`);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [forSaleModal, setForSaleModal] = useState<boolean>(false);
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [saleEndAt, setSaleEndAt] = useState<Date>();

  const contract = new Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    library?.getSigner()
  );

  async function getServiceFeesPrice() {
    const res = await contract.getServiceFeesPrice();
    setServiceFee(+utils.formatEther(res).toString());
  }

  async function increaseWatchTime() {
    api.post("/nfts/watch", { nft_id: params.id });
  }

  useEffect(() => {
    getServiceFeesPrice();
    if (params.id) fetchById(params.id);
    if (params.id && userData) increaseWatchTime();
  }, [params.id]);

  const setForSell = async () => {
    if (!userData) {
      history.push("/connect-wallet");
      return;
    }
    try {
      setLoadingButton(true);
      await api.put(`/nfts/sale/${item.id}`, {
        sale_end_at: moment(saleEndAt).format("YYYY-MM-DD HH:MM:SS"),
      });
      setForSaleModal(false);
      toast.success("NFT set for sale successfully");
      await fetchById(params.id);
      setLoadingButton(false);
    } catch (err: any) {
      toast.error(
        err?.response.data.message ||
          "System error please try again later if the problem persists report an incident by contacting our Support Team."
      );
      setLoadingButton(false);
    }
  };

  const stopSale = async () => {
    if (!userData) {
      history.push("/connect-wallet");
      return;
    }
    try {
      setLoadingButton(true);
      await api.put(`/nfts/stop-sale/${item.id}`);
      toast.success("Item canceled from the selling successfully");
      await fetchById(params.id);
      setLoadingButton(false);
    } catch (err: any) {
      toast.error(
        err?.response.data.message ||
          "System error please try again later if the problem persists report an incident by contacting our Support Team."
      );
      setLoadingButton(false);
    }
  };

  const buyNft = async () => {
    if (!userData) {
      history.push("/connect-wallet");
      return;
    }
    setLoadingButton(true);
    try {
      const isApprovedForAll = await contract.isApprovedForAll(
        account,
        CONTRACT_ADDRESS
      );

      if (!isApprovedForAll) {
        await contract.setApprovalForAll(CONTRACT_ADDRESS, true);
      }

      const amount = utils.parseEther(
        (parseFloat(serviceFee.toString()) + parseFloat(item.price)).toString()
      );

      const transaction = await contract.buyToken(item.token_id, {
        value: amount,
        gasLimit: 1 * 10 ** 6,
      });

      console.log("transaction", transaction);

      const response = await transaction.wait();

      console.log("response", response);

      await submitBuyNft();

      toast.success("You have successfully bought this NFT");

      await fetchById(params.id);
      setLoadingButton(false);
    } catch (err: any) {
      console.log(err?.error?.message ?? err);
      toast.error(
        err?.response?.data?.message ||
          "System error please try again later if the problem persists report an incident by contacting our Support Team."
      );
    }
    setLoadingButton(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  const renderSection1 = () => {
    return (
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {/* ---------- 1 ----------  */}
        <div className="space-y-5 pb-9">
          <div className="flex items-center justify-between">
            <Badge icon={<i className='text-xl bx bx-show'></i>} name={`${item.watch_time}`} color="green" />
            <LikeSaveBtns nft={item} />
          </div>
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
            {item?.title}
          </h2>

          {/* ---------- 4 ----------  */}
          <div className="flex flex-col space-y-4 text-sm sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
            <div className="flex items-center ">
              <Avatar
                imgUrl={item?.creator?.profile_photo}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Creator</span>
                <span className="flex items-center font-medium text-neutral-900 dark:text-neutral-200">
                  <span>{item?.creator?.username}</span>
                  {item.creator?.is_verified && (
                    <VerifyIcon iconClass="w-4 h-4" />
                  )}
                </span>
              </span>
            </div>
            <div className="hidden h-6 border-l sm:block border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex items-center">
              <Avatar
                imgUrl={item?.collection?.logo_image}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Collection</span>
                <span className="flex items-center font-medium text-neutral-900 dark:text-neutral-200">
                  <span>{item.collection?.name}</span>
                </span>
              </span>
            </div>
            <div className="hidden h-6 border-l sm:block border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex items-center">
              <Avatar
                imgUrl={item?.owner?.profile_photo}
                sizeClass="h-9 w-9"
                radius="rounded-full"
              />
              <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                <span className="text-sm">Owner</span>
                <span className="flex items-center font-medium text-neutral-900 dark:text-neutral-200">
                  <span>{item.owner?.username}</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ---------- 6 ----------  */}
        {item.is_for_sale && (
          <div className="py-9">
            <TimeCountDown sale_end_at={item.sale_end_at} />
          </div>
        )}

        {/* ---------- 7 ----------  */}
        {/* PRICE */}
        <div className="pb-9 pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="relative flex flex-col items-baseline flex-1 p-6 border-2 border-green-500 sm:flex-row rounded-xl">
              <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                price
              </span>
              <span className="text-3xl font-semibold text-green-500 xl:text-4xl">
                {item?.price} ETH{" "}
                <span className="text-xs">{`+ ${serviceFee} service fees`}</span>
              </span>
              <span className="text-lg text-neutral-400 sm:ml-2">
                ≈ ${usdPrice(item?.price + serviceFee)}
              </span>
            </div>
          </div>

          {/* show buy button only when the nft is not owned by the current user and it's for sale */}
          {(userData?.id == item?.owner?.id || item.is_for_sale) && (
            <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <ButtonPrimary
                loading={loadingButton}
                disabled={loadingButton}
                onClick={() => {
                  userData?.id != item?.owner?.id
                    ? buyNft()
                    : item.is_for_sale
                    ? stopSale()
                    : setForSaleModal(true);
                }}
                className="flex-1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 12H14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="ml-2.5">
                  {userData?.id != item?.owner?.id
                    ? "buy"
                    : item.is_for_sale
                    ? "stop sale"
                    : "set for sale"}
                </span>
              </ButtonPrimary>
            </div>
          )}
        </div>

        {/* ---------- 9 ----------  */}
        <div className="pt-9">
          <TabDetail transactions={item.transactions} />
        </div>
      </div>
    );
  };

  const renderSetForSaleModal = () => (
    <Modal show={forSaleModal} onClose={() => setForSaleModal(false)}>
      <Modal.Header>Set NFT for sale</Modal.Header>
      <Modal.Body>
        <FormItem htmlFor="sale_end_at" label="Sale end in">
          <Select
            value={saleEndAt?.toString()}
            onChange={(e) => {
              if (!e.currentTarget.value) return;
              setSaleEndAt(moment(e.currentTarget.value).toDate());
            }}
          >
            <option
              disabled={true}
              value={new Date().toString()}
              className="text-neutral-500 dark:text-white placeholder:text-white"
            >
              select a date will sell end at
            </option>
            {[
              {
                label: "5 days",
                value: moment(new Date()).add(5, "days").toString(),
              },
              {
                label: " 7 days",
                value: moment(new Date()).add(7, "days").toString(),
              },
              {
                label: "  15 days",
                value: moment(new Date()).add(15, "days").toString(),
              },
              {
                label: "one month",
                value: moment(new Date()).add(1, "M").toString(),
              },
            ].map((item, index) => (
              <option
                key={index}
                value={item.value}
                className="text-neutral-500 dark:text-white placeholder:text-white"
              >
                {item.label}
              </option>
            ))}
          </Select>
        </FormItem>
      </Modal.Body>
      <Modal.Footer>
        <ButtonPrimary loading={loadingButton} onClick={setForSell}>
          confirm
        </ButtonPrimary>
        <ButtonSecondary onClick={() => setForSaleModal(false)}>
          Decline
        </ButtonSecondary>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div
      className={`nc-NftDetailPage  ${className}`}
      data-nc-id="NftDetailPage"
    >
      {/* MAIn */}
      <main className="container flex mt-11 ">
        {item?.file_type == "audio" && (
          <AudioForNft src={item.file_path} nftId={item.id.toString()} />
        )}
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
          {/* CONTENT */}
          <div className="space-y-8 lg:space-y-10">
            {/* HEADING */}
            <NftItem
              nft={item}
              featuredImage="https://images.unsplash.com/photo-1643101808200-0d159c1331f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />

            <AccordionInfo nft={item} />
          </div>

          {/* SIDEBAR */}
          <div className="pt-10 border-t-2 lg:pt-0 xl:pl-10 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            {renderSection1()}
          </div>
        </div>
      </main>

      {renderSetForSaleModal()}

      {/* OTHER SECTION */}
      {!isPreviewMode && (
        <div className="container py-24 lg:py-32">
          {/* SECTION 1 */}
          <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <SectionSliderCategories />
          </div>

          {/* SECTION */}
          <SectionBecomeAnAuthor className="pt-24 lg:pt-32" />
        </div>
      )}
    </div>
  );
};

export default NftDetailPage;
