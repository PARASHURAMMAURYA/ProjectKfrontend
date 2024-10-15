import { refreshToken } from '../Redux/authSlice';
import { toast } from 'react-toastify';
import { AppDispatch } from '../Redux/store/store';

const requestHandler = (
  dispatch: AppDispatch,
  request: any,
  param: any,
  navigate: any,
  route: string | null,
) => {
   
  return dispatch(request(param)).then((res: any) => {
    if (res?.payload?.statusCode === 401) {
      return dispatch(refreshToken()).then((data: any) => {
        if (data?.payload?.status === 200) {
          return dispatch(request(param)).then((inrRes: any) => {
            
            return handleRes(inrRes, navigate, route, dispatch);
          });
        } else {
          navigate('/');
          toast.dismiss();
          toast.error('Session expired, please login again.');
        }
      });
    } else {
      return handleRes(res, navigate, route, dispatch);
    }
  });
};

export default requestHandler;


function handleRes(res: any, navigate: any, route: any, dispatch: any) {
    if (res?.meta?.requestStatus === 'fulfilled') {
      navigate && route && navigate(route);
      if (res?.payload?.message) {
        toast.success(res?.payload?.message);
        return;
      }
      if (res?.payload?.data?.message) {
        toast.success(res?.payload?.data?.message);
      }
    } else {
      if (Array.isArray(res?.payload?.message)) {
        toast.error(res?.payload?.message[0]);
      }
      toast.error(
        res?.payload?.message
          ? res?.payload?.message
          : 'Network error, please check Your internet connection.',
      );
    }
    return res;
  }