import { sectionSubRoute } from '@/components/ui/SectionPages'

const route = sectionSubRoute('careers')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
