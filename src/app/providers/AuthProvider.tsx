import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "shared/lib/store";
import { useIsAuthorized, useIsSessionInited } from "shared/lib/hooks/session";
import {
    clearUser,
    getCurrentUserThunk,
    initSession,
} from "entities/session";

interface Props {
    children?: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const dispatch = useAppDispatch();
    const isAuthorized = useIsAuthorized();
    const isSessionInited = useIsSessionInited();

    useEffect(() => {
        dispatch(initSession())
    }, []);

    useEffect(() => {
        if (isAuthorized) {
            dispatch(getCurrentUserThunk())
        } else {
            dispatch(clearUser());
        }
    }, [isAuthorized]);

    if (!isSessionInited) {
        return null;
    }

    return <>{children}</>;
};
