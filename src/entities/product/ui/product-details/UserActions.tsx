import { Link } from "react-router-dom";
import { Message } from "features/send-message";
import { useUser } from "shared/lib/hooks/session";
import { Button } from "shared/ui";
import { paths } from "shared/lib/paths";

interface Props {
  productId: string;
  authorId: string;
}

export const UserActions: React.FC<Props> = ({ productId, authorId }) => {
  const user = useUser();

  return (
    <div>
      {user?._id === authorId ? <Edit productId={productId} /> : <Message />}
    </div>
  );
};

const Edit: React.FC<{productId: string}> = ({ productId }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <Link to={paths.editProduct(productId)}>
        <Button>EDIT</Button>
      </Link>
    </div>
  );
};
