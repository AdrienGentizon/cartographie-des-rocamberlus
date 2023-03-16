import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import useArticleFromId from '../../contentful/useArticleFromId'
import { H2, Asset, Img } from '../../ui'

import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import YoutubeVideoEmbedder from '../../components/YoutubeVideoEmbedder/YoutubeVideoEmbedder'

// type Address = {
//   municipality: string | null
//   city: string | null
//   village: string | null
//   road: string | null
//   houseNumber: string | null
//   postcode: string | null
// }

function isHyperlinkNode(node: any): node is { data: { uri: string } } {
  return (node as { data: { uri: string } }).data?.uri !== undefined
}

function ArticlePage() {
  const { id } = useParams<{ id?: string }>()

  const { loading, error, article, draft } = useArticleFromId(id ?? '')
  // const [address, setAddress] = useState<Address | undefined>(undefined)
  const locationName = article?.locationName ? article?.locationName : undefined

  const renderOptions = {
    renderNode: {
      [MARKS.BOLD]: (node: any, children: any) => <strong>{children}</strong>,
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <p className="text-sm lg:text-base lg:font-extralight font-light  pb-3  text-justify whitespace-pre-wrap">
            {children}
          </p>
        )
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="flex flex-col gap-0">{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
        if (children.props) children.props.isListItem = true
        return <li>{children}</li>
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        if (!isHyperlinkNode(node)) return <></>
        if (node.data.uri.includes('youtu.be')) {
          return (
            <div className="flex justify-center w-full py-2">
              <YoutubeVideoEmbedder url={node.data.uri} />
            </div>
          )
        }
        return (
          <a
            className="underline cursor-pointer"
            target="_blank"
            href={node.data.uri}
            rel="noreferrer"
          >
            {children}
          </a>
        )
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        if (!node.data.target.sys.id) return <></>
        return <Asset id={node.data.target.sys.id} />
      },
    },
  }

  // const getTagValue = (xml: Document, tag: string) => {
  //   try {
  //     return xml.getElementsByTagName(tag)[0].childNodes[0].nodeValue
  //   } catch (error) {
  //     return null
  //   }
  // }

  // const getAddressString = ({
  //   road,
  //   village,
  //   municipality,
  //   postcode,
  //   houseNumber,
  // }: Address) => {
  //   const number = houseNumber ? houseNumber + ' ' : ''
  //   const street = road ? road + ', ' : ''
  //   const city = village
  //     ? village + ' - '
  //     : municipality
  //     ? municipality + ' - '
  //     : ''
  //   const zipcode = postcode ? postcode : ''
  //   return `${number}${street}${city}${zipcode}`
  // }

  // useEffect(() => {
  //   if (article?.showFullAddress === false) return
  //   if (article?.locationGpsCoordinates) {
  //     const url = `https://nominatim.openstreetmap.org/reverse?lat=${article?.locationGpsCoordinates.lat}&lon=${article?.locationGpsCoordinates.lon}`
  //     fetch(url, {
  //       method: 'GET',
  //     })
  //       .then((data) => data.text())
  //       .then((data) => {
  //         const parser = new DOMParser()
  //         const xml = parser.parseFromString(data, 'text/xml')
  //         const address = {
  //           municipality: getTagValue(xml, 'municipality'),
  //           city: getTagValue(xml, 'city'),
  //           village: getTagValue(xml, 'village'),
  //           road: getTagValue(xml, 'road'),
  //           houseNumber: getTagValue(xml, 'house_number'),
  //           postcode: getTagValue(xml, 'postcode'),
  //         }
  //         setAddress(address)
  //       })
  //       .catch((err) => console.error(err))
  //   }
  // }, [article])

  if (loading) return <p>Loading...</p>

  if (error || !article?.articleText)
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <p className="text-sm font-thin text-gray-400">
          Ah! petit problème technique.
        </p>
        <p className="text-sm font-thin text-gray-400">
          Il est possible que cet article n'existe pas.
        </p>
        <Link
          className="py-8 text-sm underline font-thin text-gray-800"
          to={'/map'}
        >
          retour à la carte
        </Link>
      </div>
    )

  if (draft)
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <p className="text-sm font-thin">
          L'article est en cours de rédaction...
        </p>
        <Link
          className="py-8 text-sm underline font-thin text-gray-800"
          to={'/map'}
        >
          retour à la carte
        </Link>
      </div>
    )

  return (
    <article className="flex flex-col px-2">
      <div className="flex justify-center py-6 flex-col">
        <H2>{article.title}</H2>
        {locationName && <p className="font-thin text-sm">{locationName}</p>}
      </div>
      <div>
        {article.artistPicture && (
          <div className="lg:max-w-xs lg:float-left lg:mr-8 mb-4">
            <Img
              alt="artist profile"
              src={`${article.artistPicture.url}?w=400`}
            />
            {(article.artistPicture?.description ||
              article.artistPicture?.title) && (
              <p className="font-thin text-xs">
                {article.artistPicture?.description
                  ? article.artistPicture.description
                  : article.artistPicture?.title
                  ? article.artistPicture.title
                  : ''}
              </p>
            )}
          </div>
        )}
        {documentToReactComponents(article.articleText.json, renderOptions)}
      </div>
    </article>
  )
}

export default function Wrapper() {
  return (
    <Layout>
      <ArticlePage />
    </Layout>
  )
}
