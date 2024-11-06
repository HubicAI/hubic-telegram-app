import { useEffect, type FC } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useProvider } from "../provider/AppProvider";
import { useSnackbar } from "notistack";

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const { user, getUser } = useProvider();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!localStorage.getItem("userid")) return;
    getUser(localStorage.getItem("userid") as string);
  }, []);

  const copyToClipboard = async () => {
    const referralLink = `https://t.me/DAETA_FirestarterBot?start=${user?.username}`;

    try {
      // Create temporary textarea
      const textArea = document.createElement("textarea");
      textArea.value = referralLink;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      
      // Select and copy text
      textArea.focus();
      textArea.select();

      // Try using the new API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(referralLink);
      } else {
        // Fallback for older browsers
        document.execCommand('copy');
      }

      // Remove temporary textarea
      document.body.removeChild(textArea);

      // Show success message
      enqueueSnackbar("Referral link copied successfully!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error) {
      enqueueSnackbar("Failed to copy referral link", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  return (
    <>
      <Breadcrumb title="Profile" description="Manage your Profile" />

      <div className="flex flex-col gap-2">
        <p className="font-[700] text-[12px] leading-[15.36px] text-[#D9D9D9]">
          Username
        </p>
        <input
          type="text"
          placeholder="talhatahir789"
          className="bg-[#202221] rounded-[8px] placeholder:text-[#D9D9D9] placeholder:text-[9px] placeholder:font-[700] placeholder:leading-[11.52px] py-[15px] pl-4 text-[12px]"
          style={{
            border: "0.5px solid #D9D9D9",
          }}
          value={user?.username}
          readOnly
        />
        <p className="text-[8px] leading-[10.24px] text-[#D9D9D9] font-[700]">
          Your official Telegram username
        </p>
      </div>

      <div
        className="w-full h-[1px]"
        style={{ borderBottom: "1px solid #5A5151" }}
      ></div>

      <div className="flex flex-col gap-2">
        <p className="font-[700] text-[12px] leading-[15.36px] text-[#D9D9D9]">
          Your referral link
        </p>
        <input
          type="text"
          placeholder="Your referral link"
          disabled
          className="bg-[#202221] rounded-[8px] placeholder:text-[#D9D9D9] placeholder:text-[9px] placeholder:font-[700] placeholder:leading-[11.52px] py-[15px] pl-4 text-[12px]"
          style={{
            border: "0.5px solid #D9D9D9",
          }}
          value={`https://t.me/DAETA_FirestarterBot?start=${user?.username}`}
        />
        <button
          className="bg-[#F7FF98] rounded-[8px] py-[16px] text-[#1C1C1C] font-[700] text-[9px] leading-[11.52px] mt-2"
          onClick={copyToClipboard}
        >
          Copy Referral link
        </button>
      </div>
    </>
  );
};

export default Profile;
