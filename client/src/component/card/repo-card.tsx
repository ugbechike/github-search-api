import React from "react";
import { BaseSimpleGrid } from "../base/base-simple-grid";
import { Card } from "./card";
import { GoRepo } from "react-icons/go";
import { AiOutlineFork, AiOutlineStar, AiOutlineEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-store/root-reducer";
import { Text } from "../base/text";
import { Box } from "../base/box";
import "./card-styles.css";
import moment from "moment";
import { ItemElement } from "../../utils/types";
import { colors } from "../../utils/color-utils";

export const RepoCard = () => {
  const { searchResult } = useSelector((state: RootState) => state.search);
  const data = searchResult.data?.items || [];

  return (
    <BaseSimpleGrid>
      {data?.map((item: ItemElement, index: number) => {
        const {
          description,
          name,
          full_name,
          stargazers_count,
          language,
          forks_count,
          owner: { login, avatar_url },
          updated_at,
          watchers,
        } = item;

        const updatedAt = moment(updated_at).fromNow();
        const bg = colors[language?.toLowerCase()]
          ? colors[language?.toLowerCase()]
          : "red";

        return (
          <Card key={index}>
            <Box className={"flex"}>
              <GoRepo />
              <Text>
                <a
                  href={`https://github.com/${full_name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
              </Text>
            </Box>
            <Box className={"description-section"}>
              <Text className={"repo-description-text"}>{description}</Text>
              <Box className={"flex desc-sub-section"}>
                {language && (
                  <Box className={"flex language-wrapper"}>
                    <Box
                      className={"lang-color"}
                      style={{ backgroundColor: bg }}
                    />
                    <Text className={"text-style"}>{language}</Text>
                  </Box>
                )}
                <Box className={"time-wrapper"}>
                  <Text className={"text-style"}>{updatedAt}</Text>
                </Box>
              </Box>
            </Box>

            <Box className={"repo-detail"}>
              <Box className={"flex star-wrapper"}>
                <AiOutlineStar color={"#586069"} />
                <Text className={"text-style spacing"}>{stargazers_count}</Text>
              </Box>
              <Box className={"flex fork-wrapper"}>
                <AiOutlineFork color={"#586069"} />
                <Text className={"text-style spacing"}>{forks_count}</Text>
              </Box>

              <Box className={"flex watcher-wrapper"}>
                <AiOutlineEye color={"#586069"} />
                <Text className={"text-style spacing"}>{watchers}</Text>
              </Box>
            </Box>

            <Box className={"flex repo-card-footer"}>
              <Text className={"text-style"}>Repo owned by, {login}</Text>
              <img
                src={avatar_url}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 25,
                  marginLeft: "10px",
                }}
                alt={"profile_pix"}
              />
            </Box>
          </Card>
        );
      })}
    </BaseSimpleGrid>
  );
};
