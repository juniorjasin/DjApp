import pygn

clientID = '1452299036-F0D031687E6211257A4D81AFB1F7C81E' # Enter your Client ID here
# userID = pygn.register(clientID)
userID = '26838888848744272-F2E01985C6B9E075B52BAFD7FFCB39E4'
# userID = '43445912446677769-7EDE83050E8A2F4CFF85C85A14B7CE01' # sin uso
print "userID: %s" % userID

busqueda = 'criminal - ozuna'
nombre_tema = busqueda.split('-')
print "buscar: {}".format(busqueda)

for i in range(1000):
    metadata = pygn.search(clientID=clientID, userID=userID, artist=nombre_tema[1], track=nombre_tema[0])
    print "metadata: %s" % metadata
