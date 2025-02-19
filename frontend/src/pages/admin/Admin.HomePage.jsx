import { useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Loader2, LogOut, Plus } from "lucide-react";
import AddMemberForm from "../../components/global/admin/addMemberForm";
import MembersList from "../../components/global/admin/MembersList";
import RequestsList from "../../components/global/admin/RequestList";
import { useAdminStore } from "../../store/useAdminStore";
import { useAuthStore } from "../../store/useAuthStore";
import EventsList from "../../components/global/admin/EventList";
import CreateEventForm from "../../components/global/admin/createEventForm";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import MessageList from "../../components/global/admin/MessageList";
import AwardsList from "../../components/global/admin/AwardsList";
import AddAwardForm from "../../components/global/admin/addAwardForm";
import AddPartnerForm from "../../components/global/admin/addPartnerForm";
import PartnerList from "../../components/global/admin/PartnerList";

export default function AdminHomePage() {
  const {
    getEvents,
    getMembers,
    getAdminRequests,
    getMessages,
    getAwards,
    events,
    partners,
    deletePartner,
    addPartner,
    getPartners,
    messages,
    members,
    awards,
    requests,
    isLoadingMessages,
    isEventsLoading,
    isMembersLoading,
    isLoadingAward,
    isLoadingPartner,
    isAddingPartner,
    isDeletingPartner,
  } = useAdminStore();

  useEffect(() => {
    getEvents();
    getMembers();
    getMessages();
    getAdminRequests();
    getAwards();
    getPartners();
  }, [
    getEvents,
    getMembers,
    getAdminRequests,
    getMessages,
    getAwards,
    getPartners,
  ]);

  return (
    <section className="container mx-auto p-4 min-h-screen">
      <div className="flex items-start justify-between mb-6 mt-2">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <Tabs defaultValue="events">
        <TabsList className="flex items-center justify-start flex-wrap h-auto max-w-max gap-2">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>
        <TabsContent value="events" className="mb-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Events
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant={"outline"} size={"sm"}>
                      Add Event <Plus />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="w-full mx-auto max-h-screen">
                    <div className="space-y-2 w-full max-w-screen-xl mx-auto py-4">
                      <DrawerTitle className="text-2xl font-bold px-4">
                        Create Event
                      </DrawerTitle>
                      <DrawerDescription className="px-4">
                        Create a new event
                      </DrawerDescription>
                    </div>
                    <CreateEventForm />
                  </DrawerContent>
                </Drawer>
              </CardTitle>
              <CardDescription>Manage all events here.</CardDescription>
            </CardHeader>
            <CardContent>
              {isEventsLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <EventsList events={events} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="members" className="mb-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Members
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      Add Member <Plus className="w-4 h-4" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="w-full mx-auto max-h-screen">
                    <div className="space-y-2 w-full max-w-screen-xl mx-auto p-4">
                      <DrawerTitle className="text-2xl font-bold">
                        Add Member
                      </DrawerTitle>
                      <DrawerDescription className="text-sm text-muted-foreground">
                        Fill in the details to add a new member.
                      </DrawerDescription>
                    </div>
                    <AddMemberForm />
                  </DrawerContent>
                </Drawer>
              </CardTitle>
              <CardDescription>View and add members.</CardDescription>
            </CardHeader>
            <CardContent>
              {isMembersLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <MembersList members={members} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="requests" className="mb-2">
          <Card>
            <CardHeader>
              <CardTitle>Requests</CardTitle>
              <CardDescription>Manage incoming requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <RequestsList requests={requests} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages" className="mb-2">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Manage all form messages.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingMessages ? (
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <MessageList messages={messages} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="awards" className="mb-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Awards
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant={"outline"} size={"sm"}>
                      Add Award <Plus />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="w-full mx-auto max-h-screen">
                    <div className="space-y-2 w-full max-w-screen-xl mx-auto py-4">
                      <DrawerTitle className="text-2xl font-bold px-4">
                        Add Award
                      </DrawerTitle>
                      <DrawerDescription className="px-4">
                        Add a new award to your collection.
                      </DrawerDescription>
                    </div>
                    <AddAwardForm />
                  </DrawerContent>
                </Drawer>
              </CardTitle>
              <CardDescription>Manage all awards here.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAward ? (
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <AwardsList awards={awards} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="partners" className="mb-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Partners
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant={"outline"} size={"sm"}>
                      Add Partner <Plus />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="w-full mx-auto max-h-screen">
                    <div className="space-y-2 w-full max-w-screen-xl mx-auto py-4">
                      <DrawerTitle className="text-2xl font-bold px-4">
                        Add Partner
                      </DrawerTitle>
                      <DrawerDescription className="px-4">
                        Add new partner you have worked with.
                      </DrawerDescription>
                    </div>
                    <AddPartnerForm />
                  </DrawerContent>
                </Drawer>
              </CardTitle>
              <CardDescription>Manage all awards here.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAward ? (
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <PartnerList partners={partners}/>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
