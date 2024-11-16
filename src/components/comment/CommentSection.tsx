import { Alert, Box, Button, IconButton, Tooltip, Typography } from "@mui/joy";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import CommentInput from "./CommentInput";
import CommentFilter, { handleGetFilterComments } from "./CommentFilter";
import CommentList from "./CommentList";
import SkeletonComments from "../common/SkeletonComments";
import { useEffect, useState } from "react";
import { getCommentList } from "../../redux/asyncThunk/commentThunk";
import { useParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import toast from "react-hot-toast";

export type Filter = "DESC" | "ASC";

interface IComment {
  id?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  email?: string | null;
  movie_slug?: string;
  "user.name"?: string;
  user_id?: string;
}

const CommentSection = () => {
  const dispatch: AppDispatch = useDispatch();
  const commentList: IComment[] = useSelector(
    (state: RootState) => state.comments.commentList
  );
  const movieInfo = useSelector(
    (state: RootState) => state.movies.movieInfo.info
  );
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const filterComments = handleGetFilterComments();

    if (movieInfo?.slug) {
      handleGetAllComment(filterComments);
    }
  }, []);

  const handleGetAllComment = async (typeFilter: Filter) => {
    setIsLoading(true);
    await dispatch(
      getCommentList({
        movieSlug: params.slug as string,
        sortOrder: typeFilter,
      })
    );
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Alert color="primary" sx={{ justifyContent: "space-between" }}>
        <Typography
          startDecorator={<ForumOutlinedIcon />}
          color="primary"
          level="title-lg"
        >
          {`Bình luận (${commentList?.length})`}
        </Typography>
        <Tooltip title="Làm mới bình luận">
          <IconButton onClick={() => handleGetAllComment("DESC")}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Alert>

      <CommentInput />

      {isLoading ? (
        <SkeletonComments />
      ) : (
        <>
          {commentList.length > 0 ? (
            <>
              <CommentFilter handleGetAllComment={handleGetAllComment} />
              <CommentList />
            </>
          ) : (
            <Typography level="title-lg" color="primary">
              Chưa có bình luận nào tại đây!
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default CommentSection;
