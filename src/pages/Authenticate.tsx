import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { verifyToken } from "../redux/asyncThunk/userThunk";
import toast from "react-hot-toast";

type TypeAccount = "LOCAL" | "GOOGLE";

const Authenticate = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token: string = searchParams.get("token") as string;
    const typeAccount: string = searchParams.get("type") as string;

    handleVerifyToken(token, typeAccount as TypeAccount);
  }, []);

  const handleVerifyToken = async (token: string, typeAccount: TypeAccount) => {
    const res: any = await dispatch(
      verifyToken({
        token,
        typeAccount,
      })
    );

    if (+res.payload?.EC === 0) {
        console.log(res)
      toast.success(`Xin chào! ${res.payload?.DT?.username}`);
    } else {
      toast.error("Đăng nhập thất bại!");
    }
    navigate("/");
  };

  return <></>;
};

export default Authenticate;
