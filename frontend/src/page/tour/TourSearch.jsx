import { Box, Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function TourSearch() {
  const [area, setArea] = useState([]);
  const [areaCodes, setAreaCodes] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const serviceKey = import.meta.env.VITE_API_TOUR_SERVICE_KEY1;
  const [intros, setIntros] = useState([]);
  const [info1Details, setInfo1Details] = useState([]);
  const [info2List, setInfo2List] = useState([]);
  const [lodgingInfo2List, setLodgingInfo2List] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    setIsProcessing(true);
    axios
      .get(`https://apis.data.go.kr/B551011/KorService1/areaCode1`, {
        params: {
          serviceKey: serviceKey,
          MobileOS: "ETC",
          MobileApp: "AppTest",
          _type: "json",
          numOfRows: 100,
          pageNo: 1,
        },
      })
      .then((res) => {
        const data = res.data.response.body.items.item.reverse();
        setArea(
          data.map((item) => ({
            areaCode: item.code,
            name: item.name,
          })),
        );
      })
      .catch(() => console.log("get error"))
      .finally(() => {
        setIsProcessing(false);
      });
  }, []);

  useEffect(() => {
    if (intros.length > 0) {
      axios
        .post(`/api/tour/add/intro`, intros)
        .then(() => {})
        .catch()
        .finally(() => {
          setIntros([]);
        });
    }
  }, [handleAddIntroInfo]);

  useEffect(() => {
    if (info1Details.length > 0) {
      axios
        .put("/api/tour/add/info1detail", info1Details)
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          setInfo1Details([]);
        });
    }
  }, [handleAddContentInfo1detail]);

  useEffect(() => {
    if (info2List.length > 0) {
      axios
        .post("/api/tour/add/info2", info2List)
        .then(() => {
          console.log("post");
        })
        .catch()
        .finally(() => {
          setInfo2List([]);
        });
    }
    if (lodgingInfo2List.length > 0) {
      axios
        .post("/api/tour/add/lodgingInfo2", lodgingInfo2List)
        .then(() => {
          console.log("post");
        })
        .catch()
        .finally(() => {
          setLodgingInfo2List([]);
        });
    }
  }, [handleAddContentInfo2]);

  useEffect(() => {
    if (imageList.length > 0) {
      axios
        .post("/api/tour/add/image", imageList)
        .then(() => {
          console.log("post");
        })
        .catch(() => {})
        .finally(() => {
          setImageList([]);
        });
    }
  }, [handleAddImages]);

  if (isProcessing) {
    return <Spinner />;
  }

  function handleAddArea() {
    axios
      .post("/api/tour/add/area", area)
      .then(() => console.log("success"))
      .catch(() => console.log("add error"));
  }

  function handleGetAreaCodes() {
    axios
      .get("/api/tour/get/area")
      .then((res) => {
        setAreaCodes(res.data);
        console.log("get");
      })
      .catch(() => console.log("get error1"))
      .finally();
  }

  async function handleAddSigungu() {
    for (const areaCode of areaCodes) {
      setIsProcessing(true);
      await axios
        .get(`https://apis.data.go.kr/B551011/KorService1/areaCode1`, {
          params: {
            serviceKey: serviceKey,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            _type: "json",
            numOfRows: 100,
            pageNo: 1,
            areaCode: areaCode,
          },
        })
        .then(async (res) => {
          const data = res.data.response.body.items.item;
          const sigungu = data.map((item) => ({
            areaCode: areaCode,
            sigunguCode: item.code,
            name: item.name,
          }));
          await axios
            .post("/api/tour/add/sigungu", sigungu)
            .then(() => console.log("succeeded post sigungu"))
            .catch(() => {
              console.log("sigungu post error");
            });
        })
        .catch(() => console.log("get error"))
        .finally(() => {
          setIsProcessing(false);
        });
    }
  }

  function handleAddCat1() {
    axios
      .get(`https://apis.data.go.kr/B551011/KorService1/categoryCode1`, {
        params: {
          serviceKey: serviceKey,
          MobileOS: "ETC",
          MobileApp: "AppTest",
          _type: "json",
          numOfRows: 50,
          pageNo: 1,
        },
      })
      .then((res) => {
        const data = res.data.response.body.items.item;
        const category1 = data.map((item) => ({
          cat1: item.code,
          name: item.name,
        }));
        axios.post("/api/tour/add/cat1", category1);
      })
      .catch();
  }

  function handleAddCat2() {
    axios
      .get("/api/tour/get/cat1")
      .then((res) => {
        const category1 = res.data;
        // console.log("p5");
        // console.log(category1);
        for (const cat1 of category1) {
          setIsProcessing(true);
          // console.log("p4");
          axios
            .get(`https://apis.data.go.kr/B551011/KorService1/categoryCode1`, {
              params: {
                serviceKey: serviceKey,
                MobileOS: "ETC",
                MobileApp: "AppTest",
                _type: "json",
                numOfRows: 50,
                pageNo: 1,
                cat1: cat1,
              },
            })
            .then(async (res) => {
              const data = res.data.response.body.items.item;
              const category2 = data.map((item) => ({
                cat1: cat1,
                cat2: item.code,
                name: item.name,
              }));
              await axios
                .post("/api/tour/add/cat2", category2)
                .then(() => {
                  // console.log("p3");
                })
                .catch();
              // console.log("p2");
            })
            .catch(() => {})
            .finally(() => setIsProcessing(false));
        }
        // console.log("p1");
      })
      .catch();
  }

  function handleAddCat3() {
    axios
      .get("/api/tour/get/cat2")
      .then((res) => {
        const category2 = res.data;
        for (const cat2 of category2) {
          setIsProcessing(true);
          const cat1 = cat2.toString().slice(0, 3);
          axios
            .get(`https://apis.data.go.kr/B551011/KorService1/categoryCode1`, {
              params: {
                serviceKey: serviceKey,
                MobileOS: "ETC",
                MobileApp: "AppTest",
                _type: "json",
                numOfRows: 50,
                pageNo: 1,
                cat1: cat1,
                cat2: cat2,
              },
            })
            .then((res) => {
              const data = res.data.response.body.items.item;
              const category3 = data.map((item) => ({
                cat2: cat2,
                cat3: item.code,
                name: item.name,
              }));
              axios
                .post("/api/tour/add/cat3", category3)
                .then(() => {})
                .catch(() => {});
            })
            .catch(() => {})
            .finally(() => {
              setIsProcessing(false);
            });
        }
      })
      .catch(() => {});
  }

  function handleAddContent1() {
    // 미사용
    axios
      .get(`https://apis.data.go.kr/B551011/KorService1/detailCommon1`, {
        params: {
          serviceKey: serviceKey,
          MobileOS: "ETC",
          MobileApp: "AppTest",
          _type: "json",
          contentId: 126508,
          defaultYN: "Y",
          firstImageYN: "Y",
          areacodeYN: "Y",
          catcodeYN: "Y",
          addrinfoYN: "Y",
          mapinfoYN: "Y",
          overviewYN: "Y",
          numOfRows: 3,
          pageNo: 1,
        },
      })
      .then((res) => {
        const data = res.data.response.body.items.item;
        const content = data.map((item) => ({
          contentId: item.contentid,
          typeId: item.contenttypeid,
          cat3: item.cat3,
          areaCode: item.areacode,
          sigunguCode: item.sigungucode,
          title: item.title,
          zipcode: item.zipcode,
          address: item.addr1 + " " + item.addr2,
          tel: item.tel,
          homepage: item.homepage,
          overview: item.overview,
          firstImage1: item.firstimage,
          firstImage2: item.firstimage2,
          mapx: item.mapx,
          mapy: item.mapy,
          created: item.createdtime,
          modified: item.modifiedtime,
        }));
        axios
          .post("/api/tour/add/content", content)
          .then(() => console.log("post"));
      });
  }

  function handleAddContent2() {
    // for (let pageNo = 6; pageNo > 0; pageNo--) {
    setIsProcessing(true);
    axios
      .get(`https://apis.data.go.kr/B551011/KorService1/areaBasedSyncList1`, {
        params: {
          serviceKey: serviceKey,
          MobileOS: "ETC",
          MobileApp: "AppTest",
          _type: "json",
          showflag: 1,
          listYN: "Y", // Y: 목록, N: 개수
          arrange: "C", // 정렬 (A=제목순, C=수정일순, D=생성일순)
          numOfRows: 9000,
          pageNo: 1,
        },
      })
      .then((res) => {
        const data = res.data.response.body.items.item.reverse();
        const content = data.map((item) => ({
          contentId: item.contentid,
          typeId: item.contenttypeid,
          cat3: item.cat3,
          areaCode: item.areacode,
          sigunguCode: item.sigungucode,
          title: item.title,
        }));

        axios
          .post("/api/tour/add/content", content)
          .then(() => {
            console.log("post");
          })
          .catch()
          .finally(() => {
            setIsProcessing(false);
          });
      });
    // }
  }

  function handleAddContentInfo1() {
    // for (let pageNo = 6; pageNo > 0; pageNo--) {
    setIsProcessing(true);
    axios
      .get(`https://apis.data.go.kr/B551011/KorService1/areaBasedSyncList1`, {
        params: {
          serviceKey: serviceKey,
          MobileOS: "ETC",
          MobileApp: "AppTest",
          _type: "json",
          showflag: 1,
          listYN: "Y", // Y: 목록, N: 개수
          arrange: "C", // 정렬 (A=제목순, C=수정일순, D=생성일순)
          numOfRows: 9000,
          pageNo: 1,
        },
      })
      .then((res) => {
        const data = res.data.response.body.items.item.reverse();
        const info1 = data.map((item) => ({
          contentId: item.contentid,
          zipcode: item.zipcode,
          address: item.addr1 + " " + item.addr2,
          tel: item.tel,
          //  homepage, overview 는 detailCommon1 조회 필요
          //  상세 정보는 각 content마다 하나하나 api 요청이 필요하므로 운영계정 신청해야 입력 가능
          // homepage: item.homepage,
          // overview: item.overview,
          homepage: null,
          overview: null,
          firstImage1: item.firstimage,
          firstImage2: item.firstimage2,
          mapx: item.mapx,
          mapy: item.mapy,
          created: item.createdtime,
          modified: item.modifiedtime,
        }));

        axios
          .post("/api/tour/add/info1", info1)
          .then(() => {
            console.log("post");
          })
          .catch(() => {})
          .finally(() => {
            setIsProcessing(false);
          });
      });
    // }
  }

  function handleAddContentInfo1detail() {
    setIsProcessing(true);
    /*
    axios.get(`/api/tour/get/contentId`).then((res) => {
      const idList = res.data;
      for (const id of idList) {
      //   모든 데이터 호출용
        (get id값 바꿀것)
      }
    }).catch((err) => console.log(err))
      .finally(() => setIsProcessing(false));;
     */

    axios
      .get(`/api/tour/get/content/29777`)
      .then((res) => {
        const contentList = res.data;
        for (const content of contentList) {
          const id = content.id;
          const exContentId = content.exContentId;

          axios
            .get(`https://apis.data.go.kr/B551011/KorService1/detailCommon1`, {
              params: {
                serviceKey: serviceKey,
                MobileOS: "ETC",
                MobileApp: "AppTest",
                _type: "json",
                contentId: exContentId,
                defaultYN: "Y",
                firstImageYN: "N",
                areacodeYN: "N",
                catcodeYN: "N",
                addrinfoYN: "N",
                mapinfoYN: "N",
                overviewYN: "Y",
                numOfRows: 5,
                pageNo: 1,
              },
            })
            .then((res) => {
              const data = res.data.response.body.items.item;
              const info1detail = data.map((item) => ({
                // info1 의 나머지 정보
                id: id,
                contentId: item.contentid,
                homepage: item.homepage,
                overview: item.overview,
              }));
              setInfo1Details([...info1Details, info1detail]);
            });
        }
      })
      .catch()
      .finally(() => {
        setIsProcessing(false);
      });
  }

  function handleAddContentInfo2() {
    setIsProcessing(true);
    /* // 모든 데이터 호출용
    axios
      .get(`/api/tour/get/contentId`)
      .then((res) => {
        const idList = res.data;
        for (const id of idList) {
          axios.get(`/api/tour/get/content/${id}`).then((res) => {
            const contentList = res.data;
            for (const content of contentList) {
              const exContentId = content.exContentId;
              const typeId = content.typeId;

              // typeId 가 32가 아니면
              if (typeId !== 32) {
                axios
                  .get(
                    `https://apis.data.go.kr/B551011/KorService1/detailInfo1`,
                    {
                      params: {
                        serviceKey: serviceKey,
                        MobileOS: "ETC",
                        MobileApp: "AppTest",
                        _type: "json",
                        contentId: exContentId,
                        contentTypeId: typeId,
                        numOfRows: 100,
                        pageNo: 1,
                      },
                    },
                  )
                  .then((res) => {
                    const data = res.data.response.body.items.item;
                    const info2 = data.map((item) => ({
                      contentId: id,
                      number: item.serialnum,
                      infoName: item.infoname,
                      infoText: item.infotext,
                    }));
                    setInfo2List([...info2List, info2]);
                  });
              }
              // typeId 가 32일 경우
              if (typeId === 32) {
                axios
                  .get(
                    `https://apis.data.go.kr/B551011/KorService1/detailInfo1`,
                    {
                      params: {
                        serviceKey: serviceKey,
                        MobileOS: "ETC",
                        MobileApp: "AppTest",
                        _type: "json",
                        contentId: exContentId,
                        contentTypeId: typeId,
                        numOfRows: 100,
                        pageNo: 1,
                      },
                    },
                  )
                  .then((res) => {
                    const data = res.data.response.body.items.item;
                    const info2 = data.map((item, index) => ({
                      contentId: id,
                      number: index,
                      title: item.roomtitle,
                      size: item.roomsize1,
                      roomCount: item.roomcount,
                      baseAccomCount: item.roombasecount,
                      maxAccomCount: item.roommaxcount,
                      offSeasonFeeWd: item.roomoffseasonminfee1,
                      peakSeasonFeeWd: item.roompeakseasonminfee1,
                      offSeasonFeeWe: item.roomoffseasonminfee2,
                      peakSeasonFeeWe: item.roompeakseasonminfee2,
                      intro: item.roomintro,
                      aircondition: item.roomaircondition,
                      bath: item.roombath,
                      bathFacility: item.roombathfacility,
                      cable: item.roomcable,
                      cook: item.roomcook,
                      hairdryer: item.roomhairdryer,
                      homeTheater: item.roomhometheater, // 추가
                      internet: item.roominternet,
                      pc: item.roompc,
                      sofa: item.roomsofa,
                      refrigerator: item.roomrefrigerator,
                      toiletries: item.roomtoiletries,
                      tv: item.roomtv,
                      img1: item.roomimg1,
                      img2: item.roomimg2,
                      img3: item.roomimg3,
                      img4: item.roomimg4,
                      img5: item.roomimg5,
                    }));
                    setLodgingInfo2List([...lodgingInfo2List, info2]);
                  });
              }
            }
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsProcessing(false));
     */

    // test
    axios
      .get(`/api/tour/get/content/29777`)
      .then((res) => {
        const contentList = res.data;
        for (const content of contentList) {
          const id = content.id;
          const exContentId = content.exContentId;
          const typeId = content.typeId;

          // typeId 가 32가 아니면
          if (typeId !== 32) {
            axios
              .get(`https://apis.data.go.kr/B551011/KorService1/detailInfo1`, {
                params: {
                  serviceKey: serviceKey,
                  MobileOS: "ETC",
                  MobileApp: "AppTest",
                  _type: "json",
                  contentId: exContentId,
                  contentTypeId: typeId,
                  numOfRows: 100,
                  pageNo: 1,
                },
              })
              .then((res) => {
                const data = res.data.response.body.items.item;
                const info2 = data.map((item) => ({
                  contentId: id,
                  number: item.serialnum,
                  infoName: item.infoname,
                  infoText: item.infotext,
                }));
                setInfo2List([...info2List, info2]);
              });
          }
          // typeId 가 32일 경우
          if (typeId === 32) {
            axios
              .get(`https://apis.data.go.kr/B551011/KorService1/detailInfo1`, {
                params: {
                  serviceKey: serviceKey,
                  MobileOS: "ETC",
                  MobileApp: "AppTest",
                  _type: "json",
                  contentId: exContentId,
                  contentTypeId: typeId,
                  numOfRows: 100,
                  pageNo: 1,
                },
              })
              .then((res) => {
                const data = res.data.response.body.items.item;
                const info2 = data.map((item, index) => ({
                  contentId: id,
                  number: index,
                  title: item.roomtitle,
                  size: item.roomsize1,
                  roomCount: item.roomcount,
                  baseAccomCount: item.roombasecount,
                  maxAccomCount: item.roommaxcount,
                  offSeasonFeeWd: item.roomoffseasonminfee1,
                  peakSeasonFeeWd: item.roompeakseasonminfee1,
                  offSeasonFeeWe: item.roomoffseasonminfee2,
                  peakSeasonFeeWe: item.roompeakseasonminfee2,
                  intro: item.roomintro,
                  aircondition: item.roomaircondition,
                  bath: item.roombath,
                  bathFacility: item.roombathfacility,
                  cable: item.roomcable,
                  cook: item.roomcook,
                  hairdryer: item.roomhairdryer,
                  homeTheater: item.roomhometheater, // 추가
                  internet: item.roominternet,
                  pc: item.roompc,
                  sofa: item.roomsofa,
                  refrigerator: item.roomrefrigerator,
                  toiletries: item.roomtoiletries,
                  tv: item.roomtv,
                  img1: item.roomimg1,
                  img2: item.roomimg2,
                  img3: item.roomimg3,
                  img4: item.roomimg4,
                  img5: item.roomimg5,
                }));
                setLodgingInfo2List([...lodgingInfo2List, info2]);
              });
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsProcessing(false));
  }

  function handleAddImages() {
    setIsProcessing(true);

    /*
    axios.get(`/api/tour/get/contentId`).then((res) => {
      const idList = res.data;
      for (const id of idList) {
      //   모든 데이터 호출용
        (get id값 바꿀것)
      }
    }).catch((err) => console.log(err))
      .finally(() => setIsProcessing(false));;
     */

    axios
      .get(`/api/tour/get/content/29777`)
      .then((res) => {
        const contentList = res.data;
        for (const content of contentList) {
          const id = content.id;
          const exContentId = content.exContentId;

          axios
            .get(`https://apis.data.go.kr/B551011/KorService1/detailImage1`, {
              params: {
                serviceKey: serviceKey,
                MobileOS: "ETC",
                MobileApp: "AppTest",
                _type: "json",
                contentId: exContentId,
                imageYN: "Y",
                subImageYN: "Y",
                numOfRows: 100,
                pageNo: 1,
              },
            })
            .then((res) => {
              const data = res.data.response.body.items.item;
              const images = data.map((item) => ({
                contentId: id,
                originalUrl: item.originimgurl,
                smallUrl: item.smallimageurl,
              }));
              setImageList([...imageList, images]);
            });
        }
      })
      .catch()
      .finally(() => setIsProcessing(false));
  }

  function handleAddTypeCategoryMapping() {
    setIsProcessing(true);
    axios
      .get("/api/tour/get/contentType")
      .then((res) => {
        const contentTypes = res.data;
        for (const typeId of contentTypes) {
          axios
            .get(`https://apis.data.go.kr/B551011/KorService1/categoryCode1`, {
              params: {
                serviceKey: serviceKey,
                MobileOS: "ETC",
                MobileApp: "AppTest",
                _type: "json",
                contentTypeId: typeId,
                numOfRows: 20,
                pageNo: 1,
              },
            })
            .then((res) => {
              const data1 = res.data.response.body.items.item;
              data1.map((item1) => {
                const cat1 = item1.code;

                axios
                  .get(
                    `https://apis.data.go.kr/B551011/KorService1/categoryCode1`,
                    {
                      params: {
                        serviceKey: serviceKey,
                        MobileOS: "ETC",
                        MobileApp: "AppTest",
                        _type: "json",
                        contentTypeId: typeId,
                        cat1: cat1,
                        numOfRows: 20,
                        pageNo: 1,
                      },
                    },
                  )
                  .then((res) => {
                    const data2 = res.data.response.body.items.item;
                    const typeCatMap = data2.map((item2) => ({
                      contentTypeId: typeId,
                      cat1: cat1,
                      cat2: item2.code,
                    }));

                    axios
                      .post("/api/tour/add/typeCatMap", typeCatMap)
                      .then(() => {
                        console.log("post");
                      })
                      .catch(() => {})
                      .finally(() => {});
                  });
              });
            });
        }
      })
      .catch()
      .finally(() => setIsProcessing(false));
  }

  function getIntroInfo(exContentId, typeId) {
    return axios
      .get(`https://apis.data.go.kr/B551011/KorService1/detailIntro1`, {
        params: {
          serviceKey: serviceKey,
          MobileOS: "ETC",
          MobileApp: "AppTest",
          _type: "json",
          contentId: exContentId,
          contentTypeId: typeId,
          numOfRows: 50,
          pageNo: 1,
        },
      })
      .then((res) => {
        return res.data.response.body.items.item;
      });
  }

  function handleAddIntroInfo() {
    setIsProcessing(true);
    /*
    axios.get(`/api/tour/get/contentId`).then((res) => {
      const idList = res.data;
      for (const id of idList) {
      //   모든 데이터 호출용
        (get id값 바꿀것)
      }
    });
     */
    axios
      .get(`/api/tour/get/content/17592`)
      .then((res) => {
        const contentList = res.data;
        for (const content of contentList) {
          const id = content.id;
          const exContentId = content.exContentId;
          const typeId = content.typeId;

          // 관광지 ( 67257 )
          if (typeId === 12) {
            getIntroInfo(exContentId, typeId).then((data) => {
              const intro = data.map((item) => ({
                contentId: id,
                typeId: typeId,
                accomCount: item.accomcount,
                chkBabyCarriage: item.chkbabycarriage,
                chkCreditCard: item.chkcreditcard,
                chkPet: item.chkpet,
                expAgeRange: item.expagerange,
                expGuide: item.expguide,
                heritage1: item.heritage1,
                heritage2: item.heritage2,
                heritage3: item.heritage3,
                parking: item.parking,
                openDate: item.opendate,
                restDate: item.restdate,
                telCenter: item.infocenter,
                useSeason: item.useseason,
                useTime: item.usetime,
              }));
              setIntros([...intros, intro]);
            });
          }
          // 문화시설 ( 40972 )
          if (typeId === 14) {
            getIntroInfo(exContentId, typeId).then((data) => {
              const intro = data.map((item) => ({
                contentId: id,
                typeId: typeId,
                accomCount: item.accomcountculture,
                chkBabyCarriage: item.chkbabycarriageculture,
                chkCreditCard: item.chkcreditcardculture,
                chkPet: item.chkpetculture,
                discount: item.discountinfo,
                parking: item.parkingculture,
                parkingFee: item.parkingfee,
                restDate: item.restdateculture,
                telCenter: item.infocenterculture,
                useFee: item.usefee,
                useTime: item.usetimeculture,
                scale: item.scale,
                spendTime: item.spendtime,
              }));
              setIntros([...intros, intro]);
            });
          }
          // 축제/공연/행사 ( 70878 )
          if (typeId === 15) {
            getIntroInfo(exContentId, typeId).then((data) => {
              const intro = data.map((item) => ({
                contentId: id,
                typeId: typeId,
                ageLimit: item.agelimit,
                bookingPlace: item.bookingplace,
                discount: item.discountinfofestival,
                startDate: item.eventstartdate,
                endDate: item.eventenddate,
                place: item.eventplace,
                placeInfo: item.placeinfo,
                playTime: item.playtime,
                program: item.program,
                useFee: item.usetimefestival,
                spendTime: item.spendtimefestival,
                sponsor1: item.sponsor1,
                telSponsor1: item.sponsor1tel,
                sponsor2: item.sponsor2,
                telSponsor2: item.sponsor2tel,
                subEvent: item.subevent,
              }));
              setIntros([...intros, intro]);
            });
          }
          // 레포츠 ( 41147 )
          if (typeId === 28) {
            getIntroInfo(exContentId, typeId).then((data) => {
              const intro = data.map((item) => ({
                contentId: id,
                typeId: typeId,
                accomCount: item.accomcountleports,
                chkBabyCarriage: item.chkbabycarriageleports,
                chkCreditCard: item.chkcreditcardleports,
                chkPet: item.chkpetleports,
                expAgeRange: item.expagerangeleports,
                openPeriod: item.openperiod,
                parking: item.parkingleports,
                parkingFee: item.parkingfeeleports,
                restDate: item.restdateleports,
                reservation: item.reservation,
                telCenter: item.infocenterleports,
                useFee: item.usefeeleports,
                useTime: item.usetimeleports,
                scale: item.scaleleports,
              }));
              setIntros([...intros, intro]);
            });
          }
          // 숙박 ( 29777 )
          if (typeId === 32) {
            getIntroInfo(exContentId, typeId).then((data) => {
              const intro = data.map((item) => ({
                contentId: id,
                typeId: typeId,
                accomCount: item.accomcountlodging,
                checkIn: item.checkintime,
                checkOut: item.checkouttime,
                chkCooking: item.chkcooking,
                foodPlace: item.foodplace,
                parking: item.parkinglodging,
                pickup: item.pickup,
                reservationTel: item.reservationlodging,
                reservationUrl: item.reservationurl,
                telCenter: item.infocenterlodging,
                scale: item.scalelodging,
                roomCount: item.roomcount,
                roomType: item.roomtype,
                subFacility: item.subfacility,
              }));
              setIntros([...intros, intro]);
            });
          }
          // 쇼핑 ( 70734 )
          if (typeId === 38) {
            getIntroInfo(exContentId, typeId).then((data) => {
              const intro = data.map((item) => ({
                contentId: id,
                typeId: typeId,
                chkBabyCarriage: item.chkbabycarriageshopping,
                chkCreditCard: item.chkcreditcardshopping,
                chkPet: item.chkpetshopping,
                fairDay: item.fairday,
                openDate: item.opendateshopping,
                openTime: item.opentime,
                parking: item.parkingshopping,
                restDate: item.restdateshopping,
                restRoom: item.restroom,
                telCenter: item.infocentershopping,
                saleItem: item.saleitem,
                scale: item.scaleshopping,
                shopGuide: item.shopguide,
              }));
              setIntros([...intros, intro]);
            });
          }
          // 음식점 ( 17592 )
          if (typeId === 39) {
            getIntroInfo(exContentId, typeId).then((data) => {
              const intro = data.map((item) => ({
                contentId: id,
                typeId: typeId,
                chkCreditCard: item.chkcreditcardfood,
                discount: item.discountinfofood,
                firstMenu: item.firstmenu,
                menu: item.treatmenu,
                kidsFacility: item.kidsfacility,
                openDate: item.opendatefood,
                openTime: item.opentimefood,
                packing: item.packing,
                parking: item.parkingfood,
                restDate: item.restdatefood,
                reservation: item.reservationfood,
                telCenter: item.infocenterfood,
                scale: item.scalefood,
                seat: item.seat,
              }));
              setIntros([...intros, intro]);
            });
          }
        }
      })
      .catch()
      .finally(() => {});

    setIsProcessing(false);
  }

  function handleAddSyncList() {
    setIsProcessing(true);
    /*
    axios.get(`/api/tour/get/lastmd`).then((res) => {
      // api modifiedtime 값이 더 작아질때까지 탐색
      const lastModified = res.data;
      const lastModifiedDate = res.data.toString().substring(0, 8);

      // for (let pageNo = 6; pageNo > 0; pageNo--) { insert
      axios
        .get(`https://apis.data.go.kr/B551011/KorService1/areaBasedSyncList1`, {
          params: {
            serviceKey: serviceKey,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            _type: "json",
            listYN: "Y", // Y: 목록, N: 개수
            arrange: "C", // 정렬 (A=제목순, C=수정일순, D=생성일순)
            numOfRows: 1000,
            pageNo: 1,
          },
        })
        .then((res) => {
          const data = res.data.response.body.items.item.reverse();
          const info1 = data.map((item) => ({
            showFlag: item.showflag,
            contentId: item.contentid,
            zipcode: item.zipcode,
            address: item.addr1 + " " + item.addr2,
            tel: item.tel,
            homepage: null,
            overview: null,
            firstImage1: item.firstimage,
            firstImage2: item.firstimage2,
            mapx: item.mapx,
            mapy: item.mapy,
            created: item.createdtime,
            modified: item.modifiedtime,
          }));

          if (info1.showFlag === 0) {
            // 삭제
            axios.delete(`/api/tour/`);
          }
          if (info1.showFlag === 1) {
            axios.get(`/api/tour/get/id/${info1.contentId}`).then((res) => {
              // id 조회
              const id = res.data;
              if (id === null) {
                // 없으면 추가
                axios
                  .post("/api/tour/add/info1", info1)
                  .then(() => {
                    console.log("post");
                  })
                  .catch(() => {})
                  .finally(() => {});
              } else {
                // 이미 있으면 수정
                axios.put(`/api/tour/modify/${id}`);
              }
            });
          }
        });
      // }
    });
    */
    setIsProcessing(false);
  }

  function handleTest() {}

  return (
    <Box>
      <Button onClick={handleAddArea}>지역 입력</Button>
      <Button onClick={handleGetAreaCodes}>areaCode 받기</Button>
      <Button onClick={handleAddSigungu}>시군구 입력</Button>
      <Button onClick={handleAddCat1}>대분류 입력</Button>
      <Button onClick={handleAddCat2}>중분류 입력</Button>
      <Button onClick={handleAddCat3}>소분류 입력</Button>
      <Button isDisabled onClick={handleAddContent1}>
        콘텐츠 입력1
      </Button>
      <Button isDisabled onClick={handleAddContent2}>
        콘텐츠 입력2(.1)
      </Button>
      <Button onClick={handleAddContentInfo1}>콘텐츠 기본 정보 입력(.2)</Button>
      <Button onClick={handleAddContentInfo1detail}>
        나머지 기본 정보 입력(.3)
      </Button>
      <Button onClick={handleAddContentInfo2}>콘텐츠 상세 정보 입력(.4)</Button>
      <Button onClick={handleAddImages}>이미지 입력(.5)</Button>
      <Button onClick={handleAddTypeCategoryMapping}>
        타입-카테고리 매핑 정보 입력
      </Button>
      <Button onClick={handleAddIntroInfo}>소개정보 입력(.6)</Button>
      <Button isDisabled onClick={handleAddSyncList}>
        정보 동기화
      </Button>
      <Box mt={5}>
        <Button onClick={handleTest}>테스트 버튼</Button>
      </Box>

      {area.length > 0 && (
        <Box>
          {areaCodes}
          {area.map((item) => (
            <Box key={item.code}>
              <h2>{item.areaCode}</h2>
              <p>{item.name}</p>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
