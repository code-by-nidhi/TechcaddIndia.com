import { sectionSubRoute } from '@/components/ui/SectionPages'

const route = sectionSubRoute('resources')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
