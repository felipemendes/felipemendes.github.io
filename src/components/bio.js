/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          description
          author {
            name
            summary
          }
          social {
            linkedin
            github
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const avatar = data?.avatar?.childImageSharp?.fixed
  const description = data?.site.siteMetadata.description

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <p>
          {description}
          <br/>
          <a href={`https://github.com/${social?.github || ``}`} target="_blank" rel="noreferrer">GitHub</a> e 
          <a href={`https://www.linkedin.com/in/${social?.linkedin || ``}/`} target="_blank" rel="noreferrer"> LinkedIn</a>
        </p>
      )}
    </div>
  )
}

export default Bio
