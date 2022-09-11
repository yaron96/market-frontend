import { useAppSelector } from "shared/lib/store";

export const useIsAuthorized = () =>
    useAppSelector((state) => !!state.session.isAuthorized);

export const useIsSessionInited = () =>
    useAppSelector((state) => !!state.session.isSessionInited);

export const useUser = () => 
    useAppSelector((state) => state.session.user);