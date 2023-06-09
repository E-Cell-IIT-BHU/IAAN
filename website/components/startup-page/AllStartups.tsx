import React, { FunctionComponent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import { categories } from "@/lib/startup-categories"
import { FormType } from "@/components/FounderForm"
import CategoryTab from "@/components/startup-page/CategoryTab"
import StartupCard from "@/components/startup-page/StartupCard"

interface OwnProps {
  searchText?: string
  startups: (FormType & { websitePhoto: string; image: string })[]
}

type Props = OwnProps

const AllStartups: FunctionComponent<Props> = ({ searchText, startups }) => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filter, setFilter] = useState<
    (FormType & { websitePhoto: string; image: string })[]
  >([])
  const [sectorFilter, setSectorFilter] = useState<string>("")

  const [startupsContainerRef, enableAnimation] =
    useAutoAnimate<HTMLDivElement>()
  if (searchText) {
    enableAnimation && enableAnimation(false)
  }

  // useEffect(() => {
  //   const queryCategory =
  //     typeof router.query.category === "string" &&
  //     categories.includes(router.query.category)
  //       ? router.query.category
  //       : null
  //   setSelectedCategory(queryCategory)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router.query.category])
  useEffect(() => {
    if (searchText !== undefined && searchText!=="") {
      const filtered = startups.filter((data) =>
        data.companyName.toLowerCase().startsWith(searchText?.toLowerCase())
      )
      setFilter(filtered)
    } else if (sectorFilter !== "") {
      const filtered = startups.filter(
        (data) => data.sector.toLowerCase() === sectorFilter?.toLowerCase()
      )
      setFilter(filtered)
    }
    // else if (sectorFilter !== "" && searchText !== undefined) {
    //   const filtered = startups.filter((data) =>
    //     data.companyName.toLowerCase().startsWith(searchText?.toLowerCase())
    //     && data.sector.toLowerCase() === sectorFilter?.toLowerCase()
    //   )
    //   setFilter(filtered)
    // }
    else {
      setFilter(startups)
    }
  }, [searchText, startups, sectorFilter])
  return (
    <div className={"mt-6"}>
      <CategoryTab
        selectedCategory={selectedCategory}
        searchText={searchText}
        categories={categories}
        setSectorFilter={setSectorFilter}
      />
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        ref={startupsContainerRef}
      >
        {filter.map((startup, index) => (
          <StartupCard key={index} startup={startup} searchText={searchText} />
        ))}{" "}
      </div>
    </div>
  )
}

export default AllStartups
