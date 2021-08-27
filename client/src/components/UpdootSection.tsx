import React, { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        aria-label="updoot post"
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        icon={<ChevronUpIcon/>}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            value: 1,
            postId: post.id, 
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "updoot-loading"}
      />

      <Text textAlign="center" mt={2}>
        {post.points}
      </Text>

      <IconButton
        aria-label="downdoot post"
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        icon={<ChevronDownIcon />}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            value: -1,
            postId: post.id,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
        
      />
    </Flex>
  );
};