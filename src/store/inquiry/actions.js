import axiosInst from "@/utility/axiosInst";

export default {
  requestInquiryRegisterToSpring({ }, payload) {
    const { inquiryCategoryType, inquiryTitle, inquiryContent, inquiryImageNames } = payload
    const userToken = localStorage.getItem("userToken")

    return axiosInst.springAxiosInst.post("/inquiry/register",
      { inquiryCategoryType, inquiryTitle, inquiryContent, inquiryImageNames },
      { headers: { Authorization: userToken } })
      .then((res) => {
        return res.data
      });
  },
};