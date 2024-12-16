
   /*-=Sample code=-*/
   import { H1Header, ImageSrcStyle, LinkButton } from "@/assets/styles/Styles";
   import { useScroll, useTransform } from "framer-motion";
   import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
   import StyleguideSubMenus  from "@components/styleguide/StyleguideSubMenus";
   import { useRef }          from "react";
   import { MotionBox }       from "@assets/variables/Variables";
   import Carousel            from "../carousel/Carousel";
   import ParallaxCinco       from "./parallaxComponents/ParallaxCinco";
   import ParallaxDos         from "./parallaxComponents/ParallaxDos";
   import ParallaxTres        from "./parallaxComponents/ParallaxTres";
   import ParallaxUno         from "./parallaxComponents/ParallaxUno";
   import Copy2Clipboard      from "@components/hilights/Copy2Clipboard";
   import CodeHilite from "@components/hilights/CodeHilite";
   import carousel01 from "@images/styleguide/Carousel/carousel-filipinas/carousel-filipinas-01.webp";
   import carousel02 from "@images/styleguide/Carousel/carousel-filipinas/carousel-filipinas-02.webp";
   import carousel03 from "@images/styleguide/Carousel/carousel-filipinas/carousel-filipinas-03.webp";
   import carousel04 from "@images/styleguide/Carousel/carousel-filipinas/carousel-filipinas-04.webp";
   import carousel05 from "@images/styleguide/Carousel/carousel-filipinas/carousel-filipinas-05.webp";
   import carousel07 from "@images/styleguide/Carousel/carousel-filipinas/carousel-filipinas-07.webp";
   import carousel08 from "@images/styleguide/Carousel/carousel-filipinas/carousel-filipinas-08.webp";
   import Layout     from "@/components/Layout";

   const carouselImages = [
      {image: carousel01},
      {image: carousel02},
      {image: carousel03},
      {image: carousel04},
      {image: carousel05}
   ];

   const Parallax = () => {
      const containerRef = useRef(null);
      const {scrollYProgress} = useScroll({
         target: containerRef,
         offset: ["start end", "end start"],
      })
      const yImg1 =  useTransform(scrollYProgress, [0, 1],   ["100px", "-200px"]);
      const yImg2 =  useTransform(scrollYProgress, [0, 1],   ["220px", "-400px"]);
      const yImg3 =  useTransform(scrollYProgress, [0, 1],   ["950px", "-2000px"]);
      const sImg3 =  useTransform(scrollYProgress, [.05, 1], [.15, 2.25]);

      return (
         <Layout>
            <MotionBox className={"subMenuWrapper"}
               position = {"sticky"}
               top      = {"-34px"}
               zIndex   = {"5000"}
               >
               <StyleguideSubMenus />
            </MotionBox>

            <Box className="mainContainer"
               position = {"relative"}
               height   = {"4000px"}
               width    = {"90%"}
               margin   = {"0 auto"}
               >
               <Box className="parallaxGroup1Container"
                  position = {"relative"}
                  height   = {"1600px"}
                  zIndex   = {"10"}
                  >
                  {/* Image 01 */}
                  <MotionBox className={"image1Wrapper"}
                     style    = {{ y:yImg1 }}
                     position = {"sticky"}
                     top      = {"50px"}
                     zIndex   = {"1"}
                     >
                     <ParallaxUno/>
                  </MotionBox>
                  {/* Image 02 */}
                  <MotionBox
                     style    = {{y:yImg2}}
                     position = {"sticky"}
                     top      = {"70px"}
                     zIndex   = {"2"}
                     >
                     <ParallaxDos/>
                  </MotionBox>

                  {/* Image 03 */}
                  <MotionBox
                     style    = {{y:yImg3, scale:sImg3}}
                     position = {"sticky"}
                     top      = {"0px"}
                     zIndex   = {"5"}
                     >
                     <ParallaxTres/>
                  </MotionBox>
               </Box>

               <Box className="parallaxGroup2Container">
                  <Box  className="parallaxGroup2Wrapper"
                     bg={"primary.50"}
                     padding={"1rem"}
                     borderRadius={"1rem"}
                     >
                     <Box className={"caroParaGroupWrapper"}
                        display={"flex"}
                        flexDirection={{base:"column", lg:"row"}}
                        gap={4}
                        position={"relative"}
                        height={"auto"}
                        >
                        <MotionBox className={"carouselWrapper"}
                           position={{base:"relative", lg:"sticky"}}
                           height={"fit-content"}
                           top={{base:"0px", lg:"50vh"}}
                           >
                           <H1Header
                              fontWeight={"light"}
                              textAlign={"left"}
                              color={"primary.500"}
                              >
                              Carousel
                           </H1Header>
                           <Carousel autoSlide={true} autoSlideInterval={5000}>
                              {carouselImages.map((img, index) => (
                                 <ImageSrcStyle key={index} src={img.image} />)
                              )}
                           </Carousel>
                        </MotionBox>
                        <MotionBox className={"rightLayoutWrapper"}
                           position={"relative"}
                           textAlign={"left"}
                           width={{base:"auto", md:"500px"}}
                           top={"0px"}
                           color={"primary.900"}
                           >
                           <H1Header color={"primary.400"} fontSize="1.5rem" letterSpacing="1px" textTransform="uppercase" margin="3rem 0 1rem">Multi Column Parallax</H1Header>
                           <GridContentTemplate numero="1" title="Position" buttonLabel="Parallax is the apparent shift in the position of an object."/>
                           <GridContentTemplate numero="2" title="Observation" buttonLabel="Observed by looking at an object first with one eye closed, then with the other."/>
                           <GridContentTemplate numero="3" title="Astronomy" buttonLabel="In astronomy, parallax measures the distance of nearby stars from Earth."/>
                           <Box margin={"0 0 10rem"}>
                              <ImageSrcStyle src={carousel07}/>
                           </Box>
                           <GridContentTemplate numero="4" title="Distance" buttonLabel="Earth's orbit allows calculation of its distance based on the angle of apparent shift."/>
                           <GridContentTemplate numero="5" title="Imaging" buttonLabel="Parallax is crucial in 3D imaging and photography."/>
                           <GridContentTemplate numero="6" title="Illusion" buttonLabel="It creates the illusion of depth by presenting slightly different images to each eye."/>
                           <Box margin={"0 0 0"}>
                              <ImageSrcStyle src={carousel08}/>
                           </Box>
                        </MotionBox>
                     </Box>
                     <Box margin={"5rem 0 0"}>
                        <ParallaxCinco/>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Layout>
      )
   }
   export default Parallax

   const GridContentTemplate = (props :any) => {
      const { numero, title, buttonLabel } = props;
      return (
         <Flex gap={2} margin={"1rem 0 6rem"} paddingTop={".6rem"} borderTop={"1px solid"} borderColor={"primary.100"}>
            <Box
               fontSize={{base:"2rem", md:"3rem"} }
               fontWeight={"light"} width={"4rem"} lineHeight={1} border={"0px solid"}>{numero}
            </Box>
            <Box>
               <Text fontSize={".75rem"} textTransform={"uppercase"}>{title}</Text>
               <LinkButton
                  textAlign      = {"left"}
                  fontSize       = {"1.65rem"}
                  fontWeight     = {"light"}
                  textwrap       = {"balance"}
                  textTransform  = {"none"}
                  padding        = {"0"}
                  margin         = {"0"}
                  style          = {{textWrap:"balance"}}
                  label          = {buttonLabel}
                  />
            </Box>
         </Flex>
      )
   }