import { sectionSubRoute } from '@/components/ui/SectionPages'

const route = sectionSubRoute('training')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
